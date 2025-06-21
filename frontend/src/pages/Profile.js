import React, { useState, useEffect } from 'react';
import { Typography, Box, TextField, Button, CircularProgress, Alert, Container, Tabs, Tab, Grid, Avatar, List, ListItem, ListItemText, Divider, Paper } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

const Profile = () => {
    const { user, updateUser } = useAuth();
    const [profile, setProfile] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [tabIndex, setTabIndex] = useState(0);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState('');
    const [uploading, setUploading] = useState(false);

    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

    useEffect(() => {
        const fetchData = async () => {
            if (user?.username) {
                try {
                    const profileRes = await axios.get('/api/users/me');
                    setProfile(profileRes.data);
                    // Sync with global context
                    updateUser(profileRes.data);
                    
                    const ordersRes = await axios.get('/api/orders/my');
                    setOrders(ordersRes.data);
                } catch (err) {
                    setError('Failed to fetch profile data.');
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchData();
    }, [user?.username]); // Refetch if username changes

    const handleTabChange = (event, newValue) => setTabIndex(newValue);

    const handleProfileChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        setSuccess('');
        setError('');
        axios.put('/api/users/me', profile)
            .then(res => {
                setProfile(res.data);
                updateUser(res.data);
                setSuccess('Profile updated successfully!');
            })
            .catch(() => setError('Failed to update profile.'));
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        setPasswordError('');
        setPasswordSuccess('');
        if (password !== confirmPassword) {
            return setPasswordError('Passwords do not match.');
        }
        axios.post('/api/users/me/change-password', { newPassword: password })
            .then(() => {
                setPasswordSuccess('Password changed successfully!');
                setPassword('');
                setConfirmPassword('');
            })
            .catch(() => setPasswordError('Failed to change password.'));
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        setUploading(true);
        setError('');
        setSuccess('');

        try {
            const res = await axios.post('/api/users/me/picture', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            updateUser(res.data);
            setSuccess('Profile picture updated!');
        } catch (err) {
            setError('Failed to upload picture.');
        } finally {
            setUploading(false);
        }
    };

    console.log('User object:', user);

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Container sx={{ py: 8 }}>
            <Typography variant="h4" gutterBottom>My Profile</Typography>
            <Paper>
                <Tabs value={tabIndex} onChange={handleTabChange} indicatorColor="primary" textColor="primary" centered>
                    <Tab label="Profile Details" />
                    <Tab label="Change Password" />
                    <Tab label="Order History" />
                </Tabs>
                <TabPanel value={tabIndex} index={0}>
                    <Box component="form" onSubmit={handleProfileSubmit}>
                        <Grid container spacing={3} alignItems="center">
                            <Grid item>
                                <Avatar 
                                    src={user?.imageUrl || ''}
                                    sx={{ width: 100, height: 100 }}
                                >
                                    {user?.username?.[0]?.toUpperCase() || <PersonIcon />}
                                </Avatar>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" component="label" disabled={uploading}>
                                    {uploading ? 'Uploading...' : 'Upload Picture'}
                                    <input type="file" hidden onChange={handleFileChange} accept="image/*" />
                                </Button>
                            </Grid>
                        </Grid>
                        {success && <Alert severity="success" sx={{ my: 2 }}>{success}</Alert>}
                        <TextField label="Username" name="username" value={user?.username || ''} fullWidth margin="normal" disabled />
                        <TextField label="Email" name="email" type="email" value={profile?.email || ''} onChange={handleProfileChange} fullWidth margin="normal" />
                        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Update Profile</Button>
                    </Box>
                </TabPanel>
                <TabPanel value={tabIndex} index={1}>
                    <Box component="form" onSubmit={handlePasswordChange} sx={{ maxWidth: 400 }}>
                        {passwordSuccess && <Alert severity="success" sx={{ mb: 2 }}>{passwordSuccess}</Alert>}
                        {passwordError && <Alert severity="error" sx={{ mb: 2 }}>{passwordError}</Alert>}
                        <TextField label="New Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth margin="normal" required />
                        <TextField label="Confirm New Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} fullWidth margin="normal" required />
                        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Change Password</Button>
                    </Box>
                </TabPanel>
                <TabPanel value={tabIndex} index={2}>
                    <Typography variant="h6" gutterBottom>My Orders</Typography>
                    <List>
                        {orders.length > 0 ? orders.map(order => (
                            <React.Fragment key={order.id}>
                                <ListItem button component={Link} to={`/orders/${order.id}`}>
                                    <ListItemText
                                        primary={`Order #${order.id}`}
                                        secondary={`Date: ${new Date(order.orderDate).toLocaleDateString()} - Total: $${order.total.toFixed(2)} - Status: ${order.status}`}
                                    />
                                </ListItem>
                                <Divider />
                            </React.Fragment>
                        )) : <Typography>You have no orders.</Typography>}
                    </List>
                </TabPanel>
            </Paper>
        </Container>
    );
};

export default Profile; 