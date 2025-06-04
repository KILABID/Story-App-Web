import { convertBase64ToUint8Array } from './index';
import { VAPID_PUBLIC_KEY } from '../config';

export function isNotificationAvailable() {
  return "Notification" in window;
}

export function isNotificationGranted() {
  return Notification.permission === "granted";
}

export async function requestNotificationPermission() {
  if (!isNotificationAvailable()) {
    console.error("Notification API unsupported.");
    return false;
  }

  if (isNotificationGranted()) {
    return true;
  }

  const status = await Notification.requestPermission();

  if (status === "denied") {
    alert("Izin notifikasi ditolak.");
    return false;
  }

  if (status === "default") {
    alert("Izin notifikasi ditutup atau diabaikan.");
    return false;
  }

  return true;
}

export async function getPushSubscription() {
  const registration = await navigator.serviceWorker.getRegistration();
  return await registration.pushManager.getSubscription();
}

export async function isCurrentPushSubscriptionAvailable() {
  return !!(await getPushSubscription());
}

export function generateSubscribeOptions() {
  return {
    userVisibleOnly: true,
    applicationServerKey: convertBase64ToUint8Array(VAPID_PUBLIC_KEY),
  };
}

export async function subscribe() {
  if (!(await requestNotificationPermission())) {
    return false;
  }

  if (await isCurrentPushSubscriptionAvailable()) {
    alert("Sudah berlangganan push notification.");
    return true;
  }


  const failureSubscribeMessage =
    "Langganan push notification gagal diaktifkan.";
  const successSubscribeMessage =
    "Langganan push notification berhasil diaktifkan.";
  
  try {
    const registration = await navigator.serviceWorker.getRegistration();
    const pushSubscription = await registration.pushManager.subscribe(
      generateSubscribeOptions()
    );
    const { endpoint, keys } = pushSubscription.toJSON();
    alert(successSubscribeMessage);
    return true;
  } catch (error) {
    console.error("subscribe: error:", error);
    alert(failureSubscribeMessage);
    return false;
  }
}

export async function unsubscribe() {

  const failureUnsubscribeMessage =
    "Gagal menonaktifkan push notification.";
  const successUnsubscribeMessage =
    "Push notification berhasil dinonaktifkan.";

  try {
    const pushSubscription = await getPushSubscription();
    
    if (!pushSubscription) {
      alert("Tidak ada langganan push notification aktif.");
      return false;
    }

    const isUnsubscribed = await pushSubscription.unsubscribe();
    
    if (isUnsubscribed) {
      alert(successUnsubscribeMessage);
      return true;
    } else {
      console.error("Gagal menghapus push subscription");
      alert(failureUnsubscribeMessage);
      return false;
    }
  } catch (error) {
    console.error("unsubscribe: error:", error);
    alert(failureUnsubscribeMessage);
    return false;
  }
}