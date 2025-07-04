import { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Show from '../Show';
import CustomCard from '../Card';
import { ROLES } from '@/utils/validationSchemas';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs({
    tabNames = [],
    causeData = [],
    setOpenSideDrawer = () => { },
    handleShareCause = () => { },
    handleOpenSideDrawer = () => { },
    ROLE = ROLES.OPEN_TO_ALL,
    handleViewCause = () => { },
    handleClaimCause = () => { },
    handleSponsorCause = () => { },
    filterBy = "status"
}) {
    const [value, setValue] = useState(tabNames[0]?.value || "ALL");

    const handleChange = (event, newValue) => {
        console.log("newValue", newValue);
        setValue(newValue);
    };

    const filterCauseData = (status, filterBy = "status") => {
        if (status === "ALL") {
            return causeData;
        }

        return causeData?.filter((cause) => {
            // Convert both sides to the same case for comparison
            const causeStatus = cause[filterBy]?.toUpperCase();
            return causeStatus === status;
        });
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                    sx={{
                        '& .MuiTabs-scrollButtons.Mui-disabled': {
                            opacity: 0.3,
                        },
                        '& .MuiTab-root': {
                            minWidth: { xs: '80px', sm: '120px' },
                            fontSize: { xs: '0.75rem', sm: '0.875rem' },
                            padding: { xs: '6px 8px', sm: '12px 16px' },
                        }
                    }}
                >
                    {tabNames.map((tabName, index) => (
                        <Tab key={`tab-${index}`} label={tabName.label} value={tabName.value} {...a11yProps(index)} />
                    ))}
                </Tabs>
            </Box>
            {tabNames.map((tabName, index) => (
                <CustomTabPanel key={`tab-panel-${index}`} value={value} index={tabName.value}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '20px'
                    }}>
                        {filterCauseData(tabName.value, filterBy).length > 0 ? (
                            filterCauseData(tabName.value, filterBy).map((cause, idx) => (
                                <CustomCard key={cause.causeID || idx}
                                    causeData={cause}
                                    setOpenSideDrawer={setOpenSideDrawer}
                                    handleShareCause={handleShareCause}
                                    handleOpenSideDrawer={handleOpenSideDrawer}
                                    ROLE={ROLE}
                                    handleViewCause={handleViewCause}
                                    handleClaimCause={handleClaimCause}
                                    handleSponsorCause={handleSponsorCause}
                                />
                            ))
                        ) : (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '20px' }}>
                                <p>No data for this category</p>
                            </div>
                        )}
                    </div>
                </CustomTabPanel>
            ))}
        </Box>
    );
}
