import Checkbox from '@mui/material/Checkbox';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';

const rows = [
    {
        id: 'sl',
        align: 'left',
        disablePadding: true,
        label: 'SL',
        sort: false
    },
    {
        id: 'name',
        align: 'left',
        disablePadding: false,
        label: 'Name',
        sort: true
    },
    {
        id: 'school',
        align: 'left',
        disablePadding: false,
        label: 'School',
        sort: true
    },
    {
        id: 'created_at',
        align: 'left',
        disablePadding: false,
        label: 'Created At',
        sort: true
    },
    {
        id: 'action',
        align: 'left',
        disablePadding: false,
        label: 'Action',
        sort: false
    }
];

const SectionTableHead = props => {
    const { selectedRpmIds } = props;

    const numSelected = selectedRpmIds.length;

    const createSortHandler = property => event => {
        props.onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow className="h-12">
                <TableCell padding="none" className="text-left z-99">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < props.rowCount}
                        checked={props.rowCount !== 0 && numSelected === props.rowCount}
                        onChange={props.onSelectAllClick}
                    />
                </TableCell>
                {rows.map(row => {
                    return (
                        <TableCell
                            className="px-2 md:px-4 whitespace-nowrap"
                            key={row.id}
                            align={row.align}
                            padding={row.disablePadding ? 'none' : 'default'}

                        //sortDirection={props.order.id === row.id ? props.order.direction : false}
                        >
                            {row.label}
                            {row.sort && (
                                <Tooltip
                                    title="Sort"
                                    placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={props.order.id === row.id}
                                        direction={props.order.direction}
                                        onClick={createSortHandler(row.id)}
                                        className="font-semibold"
                                    >
                                    </TableSortLabel>
                                </Tooltip>
                            )}
                        </TableCell>
                    );
                }, this)}
            </TableRow>
        </TableHead>
    );
};

export default SectionTableHead;
