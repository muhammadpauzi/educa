import moment from 'moment';

export default {
    dateFormatFromNow: function (date: any): string {
        return moment(date).fromNow();
    },
    dateFormatDefault: function (date: any, format: string): string {
        return moment(date).format('lll');
    },
    isSame: function (value1: any, value2: any): boolean {
        return value1 == value2;
    }
}