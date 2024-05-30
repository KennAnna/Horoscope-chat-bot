import * as process from 'process';
export const envFile={
  chatId:process.env.CHAT_ID,
  token:process.env.TOKEN
}
export default () => ({
  envFile: envFile,
});