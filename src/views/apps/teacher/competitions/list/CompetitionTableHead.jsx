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
        id: 'photo',
        align: 'left',
        disablePadding: false,
        label: 'Photo',
        sort: true
    },
    {
        id: 'name',
        align: 'left',
        disablePadding: false,
        label: 'Name',
        sort: true
    },
    {
        id: 'start_date',
        align: 'left',
        disablePadding: false,
        label: 'Start Date',
        sort: true
    },
    {
        id: 'end_date',
        align: 'left',
        disablePadding: false,
        label: 'End Date',
        sort: true
    },
    {
        id: 'participants',
        align: 'left',
        disablePadding: false,
        label: 'Participants',
        sort: true
    }
]

const CourseCategryTableHead = props => {
    const { selectedRpmIds } = props;

    const numSelected = selectedRpmIds.length;

    const createSortHandler = property => competition => {
        props.onRequestSort(competition, property);
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

export default CourseCategryTableHead;
