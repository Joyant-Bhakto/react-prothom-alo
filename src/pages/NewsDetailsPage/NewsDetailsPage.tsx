import React from 'react'
import { useParams } from 'react-router'
// @ts-ignore
import renderHTML from 'react-render-html'
import { useGetNewsDetailsQuery } from '@data/laravel/services/api';
import { AppBar, Backdrop, Box, CircularProgress, Container, CssBaseline, Divider, Toolbar, Typography } from '@material-ui/core';

function NewsDetailsPage() {
    const { newsCategory, newsId } = useParams<{ newsId: string; newsCategory: "latest" | "mostread" | "discussed" | "selected" }>()

    const { data: newsDetails, isLoading } = useGetNewsDetailsQuery({
        newsCategory,
        newsId: parseInt(newsId)
    })

    if (isLoading) {
        <Backdrop open>
            <CircularProgress />
        </Backdrop>
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar color={"transparent"} position={"relative"}>
                <Toolbar >
                    <img style={{ margin: "auto" }} height={80} src="https://png.pngitem.com/pimgs/s/470-4701366_transparent-newspaper-clipping-clipart-prothom-alo-logo-png.png" alt="logo" />
                </Toolbar>
            </AppBar>
            <Container maxWidth={"lg"} style={{ marginTop: "1rem" }}>
                <Typography variant={"h5"}>
                    {newsDetails?.data.headline}
                </Typography>

                <Typography variant={"h4"}>
                    {newsDetails?.data.subheadline}
                </Typography>

                <Box py={2}>
                    <Divider />
                </Box>

                <img width={"100%"} src={newsDetails?.data['cover-photo'] ?? newsDetails?.data.thumb} alt="cover-photo" />

                <Box px={2}>
                    <Typography>
                        {renderHTML(newsDetails?.data.descriptions ?? "")}
                    </Typography>
                </Box>
            </Container>
        </React.Fragment>
    )
}

export default NewsDetailsPage