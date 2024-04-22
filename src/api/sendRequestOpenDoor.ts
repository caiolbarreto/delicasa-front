import axios from 'axios'

interface SendRequestOpenDoorParam {
  userId: string
}

export async function sendRequestOpenDoor({
  userId,
}: SendRequestOpenDoorParam) {
  await axios.post(`${process.env.NEXT_PUBLIC_NGROK_URL}/${userId}`, {
    userId,
  })
}
