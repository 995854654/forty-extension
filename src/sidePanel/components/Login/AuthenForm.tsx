import React, { useState } from 'react'
import { FormLabel, TextField, Box } from '@mui/material';
import { authenUserModel } from "@/models/base/user"
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/joy/Button';
interface AuthenFormProps {
    submitForm: (formData: authenUserModel) => void;
    loading: boolean
}

const AuthenForm: React.FC<AuthenFormProps> = ({ submitForm, loading }) => {

    const [formData, setFormData] = useState({} as authenUserModel)
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            submitForm(formData)
        }
    }
    return (
        <Grid sx={{
            height: "100%",
            width: "100%",
            paddingLeft: "5%",
            paddingRight: "5%"
        }} container justifyContent="center" alignItems="center">
            <Box sx={{
                width: "100%"
            }}
                onKeyDown={handleKeyDown}

            >
                <Box>
                    <Box sx={{
                        fontWeight: "900",
                        marginBottom: "5%"
                    }}>
                        Sign in Yami
                    </Box>
                </Box>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 2 },
                        boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
                        borderRadius: '10px',
                        paddingLeft: '40px',
                        paddingRight: '50px',
                        paddingTop: '20px',
                        paddingBottom: "20px",
                        backgroundColor: '#ffffff',
                        maxWidth: '100%'
                    }}
                    //   noValidate
                    autoComplete="off"
                >
                    <Box
                        sx={{ marginLeft: "-16px" }}
                    >
                        <FormLabel sx={{ marginLeft: "16px" }}>username:</FormLabel>
                        <TextField
                            fullWidth
                            id="outlined-username"
                            label="username"
                            name="username"
                            color="primary"
                            onChange={handleChange}
                        />
                    </Box>
                    <Box
                        sx={{ marginLeft: "-16px" }}
                    >
                        <FormLabel sx={{ marginLeft: "16px" }}>password:</FormLabel>
                        <TextField
                            fullWidth
                            id="outlined-password"
                            label="password"
                            type='password'
                            name="password"
                            color="primary"
                            onChange={handleChange}
                        />
                    </Box>
                    <Button
                        loading={loading}
                        onClick={() => submitForm(formData)} >LOG IN</Button>
                </Box>


            </Box>

        </Grid>


    )
}

export default AuthenForm