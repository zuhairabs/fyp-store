import {PostBaseRoute} from '../../../api/http';
const registerRoute = 'rtc-video/register';
const sendCallDetailsRoute = 'store/book/complete';

export const appId = 'de22f355862e48539cb856e69aa4d557';
export const generateRandomUid = () => {
  return Math.floor(Math.random() * 100);
};

export const registerNewParticipant = (ref_id, channelName, uid) =>
  new Promise((resolve, reject) => {
    const body = JSON.stringify({
      type: 'store',
      ref_id,
      channelName,
      uid,
    });
    PostBaseRoute(registerRoute, body)
      .then(() => resolve())
      .catch((e) => reject(e));
  });

export const sendCallDetails = (channelName, callDuration, cred, token) =>
  new Promise((resolve, reject) => {
    const body = JSON.stringify({
      channelName,
      callDuration,
      cred,
    });
    console.log(body);
    PostBaseRoute(sendCallDetailsRoute, body, token)
      .then(() => resolve())
      .catch((e) => reject(e));
  });
