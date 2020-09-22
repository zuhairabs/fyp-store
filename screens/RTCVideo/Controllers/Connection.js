import {Post} from '../../../api/http';
const registerRoute = 'rtc-video/register';

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
    Post(registerRoute, body)
      .then(() => resolve())
      .catch((e) => reject(e));
  });
