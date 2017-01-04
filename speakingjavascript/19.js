/**
 * Created by zhangyue on 2017/1/4.
 */

function parseIsoDate(str){
    var match = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/.exec(str);

    if(!match){
        throw new Error('Not an ISO date:'+str);
    }
    console.log('Year:'+match[1]);
    console.log('Month:'+match[2]);
    console.log('Day:'+match[3]);
}
parseIsoDate('2001-12-24');

console.log(/^(a+)-\1/.test('a-a'));

