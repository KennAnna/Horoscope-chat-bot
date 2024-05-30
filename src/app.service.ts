import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { envFile } from './config';

const TelegramBot = require('node-telegram-bot-api');

@Injectable()
export class AppService {
private ListSign: string[]=[
   'aries',
    'taurus',
    'gemini',
    'cancer',
    'leo',
    'virgo',
    'libra',
    'scorpio',
    'sagittarius',
    'capricorn',
    'aquarius',
    'pisces'
  ]
  @Cron(CronExpression.EVERY_DAY_AT_4AM)
  async getHello() {
    const token = envFile.token;
    const bot = new TelegramBot(token, { polling: false });
    bot.sendMessage(envFile.chatId, 'ДОБРОЕ УТРО!!! За ночь был подготовлен свежий гороскоп для многоуважаемых РЫбят 😘');
    for (const sign of this.ListSign) {
      const message = await this.getTodayHoroscope(sign);
      //0 = chatId
      bot.sendMessage(envFile.chatId, message);
    }


  }

  async getTodayHoroscope(sign: string): Promise<string> {
    const url = `https://www.marieclaire.ru/astro/${sign}/day/`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    return $('.block-text').text();
  }
}
