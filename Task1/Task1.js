//Task 1.1
export function sentenceLikeCapitalization(str) {
    if (!str) return str;

    return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

//Task 1.3
export function wordsNumber(str) {
    str = correctSpaces(str);

    if (!str || str == ' ') return 0;
    return str.split(' ').filter(word => word != '–').length;
}

//Task 1.4
export function wordsUsage(str) {
    let words;
    let answer = {}

    str = correctSpaces(str);
    words = str.split(' ').filter(word => word != '–');
    for (let word of words) {
        let temp = word.split('');
        temp = temp.filter(char => !isPunctuationMark(char) &&
                                   !isClosingBracket(char) &&
                                   !isOpeningBracket(char) &&
                                   !isQuotes(char) ).join('').toLowerCase();
        if (temp in answer) {
            answer[temp] += 1;
        } else {
            answer[temp] = 1;
        }
    }

    return answer;
}

//Task 1.2
export function correctSpaces(str) {
    let result = [];
    let inQuotes = false;
    let inDoubleQuotes = false;
    let inReverseQuotes = false;

    for (let char of str) {
        let previousChar = result.at(-1);
        //знаки препинания, перед которыми не нужны пробелы
        if (previousChar == ' ' && ( isPunctuationMark(char) ||
                                     isClosingBracket(char) ||
                                     char == '-' ||
                                     (char == '"' && inDoubleQuotes) ||
                                     (char == '`' && inReverseQuotes) ||
                                     (char == '\'' && inQuotes))
        ) {
            result.pop();
        }
        //знаки препинания, после которых нужны пробелы
        if (char != ' ' && (previousChar == '–' ||
                            ( isPunctuationMark(previousChar) && !isPunctuationMark(char) ||
                            ( isClosingBracket(previousChar) && !isClosingBracket(char) ) ||
                            (previousChar == '"' && !inDoubleQuotes) ||
                            (previousChar == '`' && !inReverseQuotes) ||
                            (previousChar == '\'' && !inQuotes)) && !isQuotes(char))
        ) {
            result.push(' ');
        }
        //знаки препинания, перед которыми нужны пробелы
        if (previousChar != ' ' && (char == '–' || 
                                    (( isOpeningBracket(char) && !isOpeningBracket(previousChar) ) ||
                                    (char == '"' && !inDoubleQuotes) ||
                                    (char == '`' && !inReverseQuotes) ||
                                    (char == '\'' && !inQuotes)) && !isQuotes(previousChar) )
        ) {
            result.push(' ');
        }
        //лишние пробелы, а также знаки препинания, после которых не нужны пробелы
        if (char == ' ' && (previousChar == ' ' ||
                            previousChar == '-' ||
                            isOpeningBracket(previousChar) ||
                            (previousChar == '"' && inDoubleQuotes) ||
                            (previousChar == '`' && inReverseQuotes) ||
                            (previousChar == '\'' && inQuotes))
        ) {
            continue;
        }
        //мы внутри кавычек или нет?
        switch (char) {
            case '"':
                inDoubleQuotes = !inDoubleQuotes;
                break;
            case '`':
                inReverseQuotes = !inReverseQuotes;
                break;
            case '\'':
                inQuotes = !inQuotes;
                break;
        }
        result.push(char);
    }

    return result.join('');
}

function isPunctuationMark(char) {
    return char == ',' || char == '.' || char == '?' || char == '!' || char == ':' || char == ';';
}

function isOpeningBracket(char) {
    return char == '(' || char == '[' || char == '{';
}

function isClosingBracket(char) {
    return char == ')' || char == ']' || char == '}';
}

function  isQuotes(char) {
    return char == '"' || char == '`' || char == '\'';
}