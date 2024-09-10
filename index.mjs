import axios from "axios";

const sendMsgToBot = async (msg, chatId) => {
  const sendText = `https://api.telegram.org/bot${
    process.env.TELEGRAM_TOKEN
  }/sendMessage?chat_id=${chatId}&parse_mode=HTML&text=${encodeURIComponent(
    msg
  )}`;
  return await axios.get(sendText);
};

export const handler = async () => {
  console.log(1);
  const res = await axios.get(
    "https://rest.coinapi.io/v1/exchangerate/USD/PLN?apikey=044008B4-27A0-437E-8F26-842F42A4CFE9"
  );
  console.log(2);

  const rate = Number(res.data.rate).toFixed(2);
  console.log("res", res);
  console.log("rate", rate);

  console.log(3);
  if (rate > process.env.UPPER_THRESHOLD) {
    await sendMsgToBot(
      `Coin api PLN rate = ${rate}!!! It's time to sell USD to PLN!!!`,
      process.env.CHAT_ID
    );
  }

  console.log(4);

  if (rate < process.env.LOWER_THRESHOLD) {
    await sendMsgToBot(
      `Coin api PLN rate = ${rate}!!! It's time to buy USDT!!!`,
      process.env.CHAT_ID
    );
  }

  return {
    statusCode: 200,
    body: JSON.stringify("Hello from Lambda!"),
  };
};
