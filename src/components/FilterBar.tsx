type Props = {
    defaultFilter: string,
    onFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onFilterTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    defaultFilterType: string,
    filterTypes: { value: string, title: string }[],
};

export const FilterBar = ({
                              defaultFilter,
                              defaultFilterType,
                              onFilterTypeChange,
                              onFilterChange,
                              filterTypes
                          }: Props) => {
    return <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <div>
            <label htmlFor="filter" className="block font-bold">Filter</label>
            <input
                id="filter" type="text"
                defaultValue={defaultFilter}
                className="w-full border-2 bordr-gray-200 rounded-lg p-2"
                onChange={onFilterChange}/>
        </div>

        <div>
            <label htmlFor="filterType" className="block font-bold">Filter type</label>
            <select
                id="filterType"
                onChange={onFilterTypeChange}
                value={defaultFilterType}
                className="border-2 border-gray-200 rounded-lg p-2">
                {filterTypes.map((item) =>
                    <option key={item.value} value={item.value}>{item.title}</option>
                )}
            </select>
        </div>
    </div>;
}