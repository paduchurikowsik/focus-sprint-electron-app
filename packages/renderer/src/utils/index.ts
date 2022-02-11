export const minuteSeconds = 60;
export const hourSeconds = 3600;
export const daySeconds = 86400;

export const getTimeSeconds = (time: number) => (minuteSeconds - time) | 0;
export const getTimeMinutes = (time: number) => ((time % hourSeconds) / minuteSeconds) | 0;
export const getTimeHours = (time: number) => ((time % daySeconds) / hourSeconds) | 0;
export const getTimeDays = (time: number) => (time / daySeconds) | 0;
