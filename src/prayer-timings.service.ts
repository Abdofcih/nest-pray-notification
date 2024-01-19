// Import necessary modules
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import axios from 'axios';
import { getCurrentDateInCairo } from './utils/get-current-time.util';

// Define the service class
@Injectable()
export class PrayerTimesService {
  // Method to fetch prayer timings
  async getPrayerTimings(): Promise<PrayerTimingsResponse> {
    const todyDate = getCurrentDateInCairo();
    // API endpoint URL
    const apiUrl = `https://api.aladhan.com/v1/timingsByCity/${todyDate}?country=EG&city=Al+Q%C4%81hirah`;

    try {
      // Make the GET request using Axios
      const response = await axios.get(apiUrl);

      // Extract relevant data from the response
      const { data } = response.data;
      const timings: PrayerTimings = data.timings;

      // Return the extracted timings
      return { timings };
    } catch (error) {
      // Handle errors if any
      throw new UnprocessableEntityException(
        `Failed to fetch prayer timings: ${error.message}`,
      );
    }
  }
}
/*
"Midnight": "00:06", time 00:25
prayerDateTime : Sat Jan 20 2024 00:21:40 GMT+0200 (Eastern European Standard Time)
currentTimeInCairo : Sat Jan 20 2024 00:25:40 GMT+0200 (Eastern European Standard Time)
[Nest] 7460  - 01/20/2024, 12:25:40 AM     LOG [AppService] Did you pray the Sunnah of Midnight!

*/
