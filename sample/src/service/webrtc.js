import io from 'socket.io-client';
import { BACKEND_SERVER } from '../secrets/secret';

const socket = io(`${BACKEND_SERVER}`);

const configuration = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
};

let localStream;
let remoteStream;
let peerConnection;

export const startCall = async () => {
  try {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    document.getElementById('face-stream-1').srcObject = localStream;

    peerConnection = new RTCPeerConnection(configuration);

    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

    peerConnection.ontrack = (event) => {
      remoteStream = event.streams[0];
      document.getElementById('face-stream-2').srcObject = remoteStream;
    };

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('ice-candidate', event.candidate);
      }
    };

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    socket.emit('offer', offer);
  } catch (error) {
    console.error('Error starting call:', error);
  }
};

export const handleOffer = async (offer) => {
  try {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    socket.emit('answer', answer);
  } catch (error) {
    console.error('Error handling offer:', error);
  }
};

export const handleAnswer = async (answer) => {
  try {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
  } catch (error) {
    console.error('Error handling answer:', error);
  }
};

export const handleIceCandidate = (candidate) => {
  try {
    peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  } catch (error) {
    console.error('Error adding ICE candidate:', error);
  }
};

export const endCall = () => {
  if (peerConnection) {
    peerConnection.close();
    peerConnection = null;
  }
  if (localStream) {
    localStream.getTracks().forEach(track => track.stop());
    localStream = null;
  }
  document.getElementById('face-stream-1').srcObject = null;
  document.getElementById('face-stream-2').srcObject = null;
  socket.disconnect();
};
