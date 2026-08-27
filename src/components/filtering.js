import { createComparison, defaultRules } from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор

const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes).forEach((elementName) => {
        elements[elementName].append(
            ...Object.values(indexes[elementName]).map(name => {
                const option = document.createElement('option');// Твой код: создай тег option, 
                option.value = name;
                option.textContent = name;// заполни его свойства value и textContent значением name,
                return option;// и верни этот созданный элемент
            })
        );
    });

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action && action.name === 'clear') {
            const input = action.parentElement.querySelector('input');
            input.value = '';
            state[action.dataset.field] = '';
        }
        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
    }
}