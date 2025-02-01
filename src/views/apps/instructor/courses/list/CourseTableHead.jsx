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
        id: 'thumbnail',
        align: 'left',
        disablePadding: false,
        label: 'Thumbnail',
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
        id: 'category',
        align: 'left',
        disablePadding: false,
        label: 'Category',
        sort: true
    },
    {
        id: 'language',
        align: 'left',
        disablePadding: false,
        label: 'Language',
        sort: true
    },
    {
        id: 'lectures',
        align: 'left',
        disablePadding: false,
        label: 'Lectures',
        sort: true
    },

    // {
    //     id: 'duration',
    //     align: 'left',
    //     disablePadding: false,
    //     label: 'Total Duration',
    //     sort: true
    // },
    // {
    //     id: 'rating',
    //     align: 'left',
    //     disablePadding: false,
    //     label: 'Rating',
    //     sort: true
    // },
    // {
    //     id: 'reviews',
    //     align: 'left',
    //     disablePadding: false,
    //     label: 'Reviews',
    //     sort: true
    // },
    {
        id: 'is_published',
        align: 'left',
        disablePadding: false,
        label: 'Published?',
        sort: true
    },
    {
        id: 'is_completed',
        align: 'left',
        disablePadding: false,
        label: 'Completed?',
        sort: true
    },
    {
        id: 'has_caption',
        align: 'left',
        disablePadding: false,
        label: 'Has Caption?',
        sort: true
    },
    {
        id: 'is_premium',
        align: 'left',
        disablePadding: false,
        label: 'Premium?',
        sort: true
    },
    {
        id: 'is_best_rated',
        align: 'left',
        disablePadding: false,
        label: 'Best Rated? ',
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

const InstructorCourseTableHead = props => {
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
                            className="px-1 whitespace-nowrap"
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

export default InstructorCourseTableHead;
