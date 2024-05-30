import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import * as cheerio from 'cheerio';

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
  @Cron('10 * * * * *')
  async getHello() {
    const token = '';
    const bot = new TelegramBot(token, { polling: false });
    for (const sign of this.ListSign) {
      const message = await this.getTodayHoroscope(sign);
      //0 = chatId
      bot.sendMessage(0, message);
    }


  }

  async getTodayHoroscope(sign: string): Promise<string> {
    const url = `https://www.marieclaire.ru/astro/${sign}/day/`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    return $('.block-text').text();
  }
}
