import React, { useRef } from 'react'
import { Box, Tooltip, Avatar } from '@mui/material'
import { sideMenu } from "@/data/sideMenu"
import Grid from '@mui/material/Unstable_Grid2';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, Dispatch } from "@/store/sider"
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import Settings from '@/sidePanel/components/Settings';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
import MenuButton from '@mui/joy/MenuButton';
import Typography from '@mui/joy/Typography';
import { USER_AVATOR } from '@/data/config';

export default function RightLayout() {
	const siderList = useSelector((rootState: RootState) => {
		return sideMenu.map((item) => {
			if (item.key === rootState.sideRouterModel.key) {
				item["active"] = true
			} else {
				item["active"] = false
			}
			return item
		})

	})

	const isAuth = useSelector((rootState: RootState) => rootState.authenModel.isAuthenticated)
	const dispath = useDispatch<Dispatch>()

	const clickMenuButton = (key: string) => {
		dispath.sideRouterModel.push(key)
	}

	const loginORlogout = () => {
		if (isAuth){
			console.log("log out")
			sessionStorage.clear()
			dispath.notificationModel.notify({
				notifyType: "success", message: "successfully!!"
			})
			dispath.authenModel.changeAuthenticatedStatus(false)
			dispath.sideRouterModel.push("login")
		}else {
			dispath.sideRouterModel.push("login")
		}
	}

	return (
		<Box sx={{
			width: "100%",
		}}>
			<Grid container flexDirection="column"
				justifyContent="space-between"
				alignItems="center"
				sx={{
					height: "100vh",
					paddingTop: "40%",
					paddingBottom: "40%"
				}}
			>
				{/* 功能模块 */}
				<Grid container rowSpacing={3}>
					{
						siderList.filter(
							(item) => item.isDisplay === true
						).map((item, index) => {
							return (

								<Grid xs={12} key={item.key}>
									<Box sx={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center"
									}}>
										<Tooltip title={item.title} placement="left">
											{item.active ? (
												<Box sx={{
													width: "32px",
													height: "32px",
													backgroundColor: "white",
													display: "flex",
													justifyContent: "center",
													alignItems: "center",
													borderRadius: "25%"
												}}>
													<item.icon sx={{
														color: "#8a57ea",
													}}
														onClick={() => clickMenuButton(item.key)}
													></item.icon>
												</Box>

											) : (
												<Box sx={{
													transition: "all 0.3s ease",
													"&:hover": {
														transform: "scale(1.3)",
														boxShadow: "0 0 10px rgba(0, 0, 0, 0.8)"
													}
												}}>
													<item.icon sx={{
														color: "white",

													}}
														onClick={() => clickMenuButton(item.key)}
													></item.icon>

												</Box>

											)}

										</Tooltip>
									</Box>
								</Grid>

							)
						})
					}
				</Grid>
				{/* 用户操作 */}
				<Grid container direction="column" sx={{
					height: "30%"
				}} justifyContent="end" spacing={2}>
					<Grid >
						<SettingsIcon sx={{ color: "white" }}
							onClick={() => dispath.settingModel.setOpen(true)}
						/>
					</Grid>
					<Grid>

						<Box sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}>
							<Dropdown>
								<MenuButton
									sx={{
										paddingInline: "0",
										"&:hover": {
											backgroundColor: "transparent"
										}
									}}
									variant="plain"

								>
									{
										isAuth ? (
											<Avatar alt="personal avator" src={USER_AVATOR} sx={{ width: 24, height: 24 }} />
										) : (
											<Avatar sx={{ width: 24, height: 24 }}>
												<PersonIcon></PersonIcon>
											</Avatar>
										)
									}
								</MenuButton>

								<Menu
									variant="solid"
									invertedColors
									sx={{
										display: 'grid',
										gap: 1,
									}}
								>

									<MenuItem orientation="vertical">
										
										<Typography
											level="body-xs"
											textTransform="uppercase"
											fontWeight="lg"
											mb={1}
											sx={{
												color: "#bebebe",
											}}
										>个人信息</Typography>
									</MenuItem>
									<MenuItem orientation="vertical"
									onClick={loginORlogout}
									>

										<Typography
											level="body-xs"
											textTransform="uppercase"
											fontWeight="lg"
											mb={1}
											sx={{
												color: "#bebebe",
											}}
										>
											{isAuth ? "log out" : "log in"}
										</Typography>
									</MenuItem>
								</Menu>
							</Dropdown>
						</Box>


					</Grid>
				</Grid>



			</Grid>


			<Settings></Settings>
		</Box>
	)
}
