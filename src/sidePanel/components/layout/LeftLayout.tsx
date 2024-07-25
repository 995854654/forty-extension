import React from 'react'
import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/sider'
import { sideMenu } from "@/data/sideMenu"
export default function LeftLayout() {

	const LayoutComponent = useSelector((rootState: RootState) => {
		let obj = sideMenu.filter((item) => {
			return item.key === rootState.sideRouterModel.key
		})
		let defaultobj = sideMenu.filter((item) => {
			return item.default === true
		})


		if (obj.length >= 1) {
			return obj[0].element
		} else {
			return defaultobj[0].element
		}

	})
	return (
		<Box sx={{
			backgroundColor: "#1f1f1f",
			height: "100%",
			color: "white",
			borderRadius: "20px",
		}}>
			<LayoutComponent />
		</Box>
	)
}
