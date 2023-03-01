class Product {
    name = "Default";
    price = 0;
    quantity = 0;
    description = "Default";

    constructor(name, price, quantity, description) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.description = description;
    }
}

let catalog = [];
catalog.push(new Product('Name which ends with fd', 2, 6, 'Description, which ends with abc'));
catalog.push(new Product('FD and something', 10, 5, 'Contains aBc and something else'));
catalog.push(new Product('fd and something', 2, 7, 'Contains abc and something else'));
catalog.push(new Product('Contains fd and something', 2, 7, 'abc and something else'));
catalog.push(new Product('Contains FD and something', 2, 5, 'abc and something else'));

function searhProducts(str) {
    let searchParameters = {};
    let result = catalog;

    for (let param of str.split('&') ) {
        let splitIndex = param.lastIndexOf('-');
        searchParameters[param.slice(0, splitIndex)] = param.slice(splitIndex + 1);
    }

    for (let param in searchParameters) {
        if (param.startsWith('name') || param.startsWith('description')) {
            result = result.filter(product =>
                                   filterString(product, param, searchParameters[param]));
        } else {
            result = result.filter(product =>
                                   filterNumeric(product, param, searchParameters[param]));
        }
    }

    return result;
}

function filterString(product, param, value) {
    let [parameterName, mode] = param.split('-');

    switch (mode) {
        case 'starts':
            return product[parameterName].toLowerCase().startsWith(value);
        case 'contains':
            return product[parameterName].toLowerCase().includes(value);
        case 'ends':
            return product[parameterName].toLowerCase().endsWith(value);
    }
}

function filterNumeric(product, param, value) {
    let splitIndex = 0;
    if (value.includes('=')) {
        splitIndex = value.indexOf('=');
    }

    let mode = value.slice(0, splitIndex + 1);
    let number = value.slice(splitIndex + 1);

    switch (mode) {
        case '=':
            return product[param] == number;
        case '<':
            return product[param] < number;
        case '>':
            return product[param] > number;
        case '<=':
            return product[param] <= number;
        case '>=':
            return product[param] >= number;
    }
}

let str = "name-contains-fd&price-=2&quantity->5&description-ends-abc";
let str2 = "name-starts-fd&quantity->=5";
console.log( searhProducts(str2) );