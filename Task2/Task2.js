export function sum(number1, number2) {
    let str1 = number1.toString();
    let str2 = number2.toString();
    let carry = 0;
    let result = '';

    if (str1[0] == '-' && str2[0] == '-') {
        str1 = str1.slice(1);
        str2 = str2.slice(1);
        return '-' + sum(str1, str2);
    }
    if (str1[0] == '-' && str2[0] != '-') {
        str1 = str1.slice(1);
        return reduce(str2, str1);
    }
    if (str1[0] != '-' && str2[0] == '-') {
        str2 = str2.slice(1);
        return reduce(str1, str2);
    }

    if (str1.length > str2.length) {
        str2 = str2.padStart(str1.length, '0');
    } else {
        str1 = str1.padStart(str2.length, '0');
    }

    for (let i = str1.length - 1; i >= 0; i--) {
        let temp = +str1[i] + +str2[i] + carry;
        if (temp >= 10) {
            carry = 1;
            result = (temp % 10) + result;
        } else {
            carry = 0;
            result = temp + result;
        }
    }
    if (carry) {
        result = 1 + result;
    }

    return result;
}

export function reduce(number1, number2) {
    let str1 = number1.toString();
    let str2 = number2.toString();
    let carry = 0;
    let result = '';

    if (str1[0] == '-' && str2[0] == '-') {
        str1 = str1.slice(1);
        str2 = str2.slice(1);
        return reduce(str2, str1);
    }
    if (str1[0] == '-' && str2[0] != '-') {
        str1 = str1.slice(1);
        return '-' + sum(str1, str2);
    }
    if (str1[0] != '-' && str2[0] == '-') {
        str2 = str2.slice(1);
        return sum(str1, str2);
    }

    if ( !compare(str1, str2) ) {
        return '-' + reduce(str2, str1);
    }
    
    str2 = str2.padStart(str1.length, '0');

    for (let i = str1.length - 1; i >= 0; i--) {
        let temp = +str1[i] - +str2[i] - carry;
        if (temp < 0) {
            carry = 1;
            result = (temp + 10) + result;
        } else {
            carry = 0;
            result = temp + result;
        }
    }

    if (result.startsWith('0')) {
        result = trimLeadingZeros(result);
    }

    return result;
}

export function multiply(number1, number2) {
    let str1 = number1.toString();
    let str2 = number2.toString();
    let result = '0';

    if (str1[0] == '-' && str2[0] == '-') {
        str1 = str1.slice(1);
        str2 = str2.slice(1);
        return multiply(str2, str1);
    }
    if (str1[0] == '-' && str2[0] != '-') {
        str1 = str1.slice(1);
        return '-' + multiply(str1, str2);
    }
    if (str1[0] != '-' && str2[0] == '-') {
        str2 = str2.slice(1);
        return '-' + multiply(str1, str2);
    }

    if (str1.length < str2.length) return multiply(str2, str1);

    for (let i = str2.length - 1; i >= 0; i--) {
        let temp = '0';
        for (let j = 0; j < str2[i]; j++) {
            temp = sum(temp, str1);
        }
        result = sum(result, temp.padEnd(temp.length + str2.length - 1 - i, '0') );
    }

    return result;
}

export function divide(number1, number2) {
    let str1 = number1.toString();
    let str2 = number2.toString();
    let result = '';
    let reminder = '';
    let quotient;

    if (str1[0] == '-' && str2[0] == '-') {
        str1 = str1.slice(1);
        str2 = str2.slice(1);
        return divide(str2, str1);
    }
    if (str1[0] == '-' && str2[0] != '-') {
        str1 = str1.slice(1);
        return '-' + divide(str1, str2);
    }
    if (str1[0] != '-' && str2[0] == '-') {
        str2 = str2.slice(1);
        return '-' + divide(str1, str2);
    }

    if ( !compare(str1, str2) ) return '0';

    let dividend = str1.slice(0, str2.length)
    if (!compare(dividend, str2)) {
        dividend = str1.slice(0, str2.length + 1)
    }
    let usedLength = dividend.length;

    while (true) {
        reminder = dividend;
        quotient = 0;
        while (reduce(reminder, str2)[0] != '-') {
            reminder = reduce(reminder, str2);
            quotient++;
        }
        
        result = result + quotient;
        if (reminder == '0') reminder = '';

        dividend = reminder + str1.slice(usedLength, usedLength + 1);
        let i = 2;
        while ( !compare(dividend, str2) ) {
            if (str1.length < usedLength + i) return result;
            dividend = reminder + str1.slice(usedLength, usedLength + i);
            result = result + '0';
            i++
        }
        usedLength = usedLength + i - 1;
    }

}

function compare(str1, str2) {
    if (str1.length > str2.length) return true;
    if (str1.length < str2.length) return false;

    return str1 >= str2;
}

//Раз предполагается решение без регулярок
function trimLeadingZeros(str) {
    let result = str.split('');
    let i = 0;

    do {
        result.shift();
    } while (result.indexOf('0') == 0);

    return result.length ? result.join('') : '0';
}