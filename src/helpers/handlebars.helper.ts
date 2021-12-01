import moment from 'moment';

export default {
    dateFormatFromNow: function (date: any) {
        return moment(date).fromNow();
    },
    dateFormatDefault: function (date: any, format: string) {
        return moment(date).format('lll');
    }
}