import React, { useState, useMemo } from 'react';

const TableHeader = ({ headers }) => (
    <tr>
        {headers.map((header) => (
            <th
                key={header}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
                {header}
            </th>
        ))}
    </tr>
);

const TableRow = ({ item, columns }) => (
    <tr key={item.id}>
        {columns.map((column) => (
            <td key={column} className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{item[column]}</div>
            </td>
        ))}
    </tr>
);

const FilterInput = ({ fieldName, value, onChange }) => (
    <input
        className="input mr-2 mb-2 p-2 border rounded"
        name={fieldName}
        value={value}
        onChange={(e) => onChange(fieldName, e.target.value)}
        placeholder={`Filtruoti pagal ${fieldName}`}
    />
);

const DataTable = ({ data, filterBy = '' }) => {
    // Sukuriame filtravimo būsenas dinamiškai
    const filterFields = useMemo(() => 
        filterBy.split(',').map(field => field.trim()).filter(Boolean),
        [filterBy]
    );

    const [filters, setFilters] = useState(
        Object.fromEntries(filterFields.map(field => [field, '']))
    );
    
    // Gauname stulpelių pavadinimus iš pirmo duomenų objekto
    const columns = data.length > 0 ? Object.keys(data[0]) : [];

    const handleFilterChange = (fieldName, value) => {
        setFilters(prev => ({
            ...prev,
            [fieldName]: value
        }));
    };

    // Filtruojame duomenis pagal visus aktyvius filtrus
    const filteredData = useMemo(() => {
        return data.filter(item => {
            return Object.entries(filters).every(([field, filterValue]) => {
                const itemValue = String(item[field] || '').toLowerCase();
                return itemValue.includes(filterValue.toLowerCase());
            });
        });
    }, [data, filters]);

    return (
        <div className="overflow-x-auto w-full col-span-2 card">
            <div className="flex flex-wrap gap-2 mb-4 card">
                {filterFields.map(field => (
                    <FilterInput
                        key={field}
                        fieldName={field}
                        value={filters[field]}
                        onChange={handleFilterChange}
                    />
                ))}
            </div>

            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <TableHeader headers={columns} />
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {filteredData.map((item, index) => (
                        <TableRow key={index} item={item} columns={columns} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;