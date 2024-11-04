import classNames from 'classnames';

export interface PaginatorProps {
    currentPageNum: number,
    totalPagesCount: number,
    onPageChange: (num: number) => void,
}

export const Paginator = (props: PaginatorProps) => {
    const {currentPageNum, totalPagesCount, onPageChange} = props;

    let buttons: number[];
    if (totalPagesCount < 6) {
        buttons = Array.from({length: totalPagesCount}, (_, index) => index + 1)
    } else {
        switch (currentPageNum) {
        case 1:
        case 2:
        case 3: {
            buttons = [1, 2, 3, 4, -1, totalPagesCount];
            break
        }
        case totalPagesCount:
        case totalPagesCount - 1:
        case totalPagesCount - 2: {
            buttons = [1, -1, totalPagesCount - 3, totalPagesCount - 2, totalPagesCount - 1, totalPagesCount];
            break
        }
        default: {
            buttons = [1, -1, currentPageNum - 1, currentPageNum, currentPageNum + 1, -1, totalPagesCount];
            break
        }
        }
    }

    return (
        <nav>
            <ul className="flex flex-row justify-center mt-3">
                {buttons.map((num, index) => {
                    if (num === -1) {
                        return <li key={index} className="px-4 py-2">...</li>;
                    } else {
                        return <li key={index}
                            className={classNames([
                                'cursor-pointer px-4 py-2',
                                'border border-solid hover:bg-gray-200',
                                {'text-white bg-blue-700': currentPageNum === num},
                            ])}
                            onClick={() => onPageChange(num)}
                        >
                            {num}
                        </li>
                    }
                })}
            </ul>
        </nav>
    )
}