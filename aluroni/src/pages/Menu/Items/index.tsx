// react
import { useState, useEffect } from 'react';
// components
import Item from './Item';
// data
import menu from 'data/items.json';
// types
import { MenuItems } from 'types/dish';
// styles
import styles from './Items.module.scss';

interface ItemsProps {
    search: string,
    filter: number | null,
    ordenator: string
}

const Items = (props: ItemsProps) => {
    const [list, setList] = useState(menu);
    const { search, filter, ordenator } = props;


    function testSearch(title: string) {
        const regex = new RegExp(search, 'i');
        return regex.test(title);
    }

    function testFilter(id: number) {
        if (filter !== null) return filter === id;
        return true;
    }

    function order(newList: MenuItems) {
        switch (ordenator) {
            case 'porcao':
                return orderInCrescent(newList, 'size');
            case 'qtd_pessoas':
                return orderInCrescent(newList, 'serving');
            case 'preco':
                return orderInCrescent(newList, 'price');
            default:
                return newList;
        }
    }

    function orderInCrescent(
        newList: MenuItems,
        type: 'size' | 'serving' | 'price'
    ) {
        return newList.sort((a, b) => a[type] - b[type]);
    }

    useEffect(() => {
        const newList = menu.filter(
            item => testSearch(item.title) && testFilter(item.category.id)
        );
        setList(order(newList));
    }, [search,
        filter,
        ordenator
    ]);

    return (
        <div className={styles.items}>
            {
                list.length > 0 ?
                    list.map(item => (
                        <Item
                            key={item.id}
                            {...item}
                        />
                    ))
                    :
                    <div>
                        <h2 className={styles.notFoundText}>Não foi encontrado nenhum prato com esse nome.</h2>
                    </div>
            }
        </div>
    );
};

export default Items;