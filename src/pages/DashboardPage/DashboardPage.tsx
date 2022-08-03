import React from 'react'
import { useTheme } from '@material-ui/core/styles';
import { useGetNewsQuery } from '@data/laravel/services/api'
import { AppBar, CardActionArea, CssBaseline, Divider, Grid, Tab, Tabs, Toolbar, useMediaQuery, } from '@material-ui/core';
import { Backdrop, CircularProgress, Container, Box, ListItem, ListItemText, Typography, } from '@material-ui/core'
import { Link } from 'react-router-dom';

const banglaNumbers = ["০",
    "১",
    "২",
    "৩",
    "৪",
    "৫",
    "৬",
    "৭",
    "৮",
    "৯"]

function DashboardPage() {
    const theme = useTheme();
    const betweenXsAndLg = useMediaQuery(theme.breakpoints.between("xs", "md"))
    const { data: newsList, isLoading: isLoadingNewsList } = useGetNewsQuery()

    const [newsCategory, setNewsCategory] = React.useState<"latest" | "mostread" | "discussed" | "selected" | "">("")

    React.useEffect(() => {
        if (newsList?.data) {
            const keys = Object.keys(newsList.data) as Array<keyof (typeof newsList["data"])>

            setNewsCategory(keys[0])
        }
    }, [newsList])

    if (isLoadingNewsList) {
        <Backdrop open>
            <CircularProgress />
        </Backdrop>
    }

    const handleChange = (event: React.ChangeEvent<{}>, newValue: "latest" | "mostread" | "discussed" | "selected" | "") => {
        setNewsCategory(newValue);
    };

    const selectedNews = React.useMemo(() => {
        if (!newsList || !newsList.data.selected) {
            return null;
        }

        const result = [];

        if (newsList.data.selected.items[0]) {
            result.push(
                <Grid item xs={12} lg={12}>
                    <CardActionArea component={Link} to={`/news/${newsList.data.selected.items[0].id}/selected`}>

                        <Box position={"relative"}>
                            <img style={{ width: "100%" }} src={newsList.data.selected.items[0].thumb} alt={newsList.data.selected.items[0].id.toString()} />
                            <Box position={"absolute"} left={30} bottom={30}>
                                <Typography>
                                    <Typography component={"span"} style={{ color: "gold" }}>{newsList.data.selected.items[0].headline}</Typography>{!!newsList.data.selected.items[0].subheadline ? ` / ${newsList.data.selected.items[0].subheadline}` : ""}
                                </Typography>
                            </Box>
                        </Box>
                    </CardActionArea>
                </Grid>
            )
        }

        if (newsList.data.selected.items[1]) {
            result.push(
                <Grid item xs={6}>
                    <CardActionArea component={Link} to={`/news/${newsList.data.selected.items[1].id}/selected`}>
                        <Box>
                            <img style={{ width: "100%" }} src={newsList.data.selected.items[1].thumb} alt={newsList.data.selected.items[1].id.toString()} />
                            <Typography>
                                <Typography component={"span"} color={"secondary"}>{newsList.data.selected.items[1].headline}</Typography>{!!newsList.data.selected.items[1].subheadline ? ` / ${newsList.data.selected.items[1].subheadline}` : ""}
                            </Typography>
                        </Box>
                    </CardActionArea>
                </Grid>
            )
        }

        if (newsList.data.selected.items[2]) {
            result.push(
                <Grid item xs={6}>
                    <CardActionArea component={Link} to={`/news/${newsList.data.selected.items[2].id}/selected`}>
                        <Box>
                            <img style={{ width: "100%" }} src={newsList.data.selected.items[2].thumb} alt={newsList.data.selected.items[2].id.toString()} />
                            <Typography>
                                <Typography component={"span"} color={"secondary"}>{newsList.data.selected.items[2].headline}</Typography>{!!newsList.data.selected.items[2].subheadline ? ` / ${newsList.data.selected.items[2].subheadline}` : ""}
                            </Typography>
                        </Box>
                    </CardActionArea>
                </Grid>
            )
        }

        return <Grid container spacing={2}>
            <Grid item>
                <Box display={"flex"}>
                    <Box height={20} width={20} borderRadius={"50%"} bgcolor={"primary.main"} />
                    <Typography style={{ fontWeight: 700, marginLeft: 10 }}>
                        {newsList.data.selected.name}
                    </Typography>
                </Box>
            </Grid>

            {result}
        </Grid>
    }, [newsList])

    const selectedNewsRemaining = !!newsCategory && newsList?.data.selected.items.slice(3).map((item, i) => (
        <React.Fragment key={item.id}>
            <CardActionArea component={Link} to={`/news/${item.id}/selected`}>
                <Box py={1} display={"flex"} style={{ gap: 10 }}>
                    <Box flex={1}>
                        <Typography>
                            <Typography component={"span"} color={"secondary"}>{item.headline}</Typography>
                            {!!item.subheadline ? ` / ${item.subheadline}` : ""}
                        </Typography>

                        <Typography style={{ marginTop: 10 }}>16 মিনিট আগে</Typography>
                    </Box>
                    <Box >
                        <img width={70} height={50} src={item.thumb} alt={item.id.toString()} />
                    </Box>
                </Box>
            </CardActionArea>
            <Divider />
        </React.Fragment>
    ))

    const advertisementOne = (
        <React.Fragment>
            <Typography style={{ fontWeight: 700 }}>বিজ্ঞাপন</Typography>
            <Box py={2}>
                <img width={"100%"} src={"https://dummyimage.com/580x340/000/fff"} alt={"advertisement"} />
            </Box>
        </React.Fragment>
    )

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar color={"transparent"} position={"relative"}>
                <Toolbar >
                    <img style={{ margin: "auto" }} height={80} src="https://png.pngitem.com/pimgs/s/470-4701366_transparent-newspaper-clipping-clipart-prothom-alo-logo-png.png" alt="logo" />
                </Toolbar>
            </AppBar>
            <Container maxWidth={"lg"} style={{ marginTop: "1rem" }}>
                <Grid container spacing={1}>
                    <Grid item xs={12} lg={3} sm={5}>
                        <Box style={{ borderRight: "1px solid rgba(0, 0, 0, 0.12)", paddingRight: 10 }} height={"100%"}>
                            <Tabs variant={"fullWidth"} value={newsCategory} onChange={handleChange}>
                                {Object.entries(newsList?.data ?? {}).slice(0, 3).map(([category, { name }], i) => {
                                    console.log(category, name)
                                    return (
                                        <Tab style={{ minWidth: "auto", fontWeight: "bold", fontSize: "1rem" }} key={i} label={name} value={category}></Tab>
                                    )
                                })}
                            </Tabs>
                            <Divider />

                            <Box py={1}>
                                {!!newsCategory && newsList?.data[newsCategory].items.slice(0, 5).map((item, i) => (
                                    <CardActionArea component={Link} to={`/news/${item.id}/${newsCategory}`} key={item.id}>
                                        <Box py={1} >
                                            <Typography variant={"h4"} style={{ fontWeight: 500 }}>{banglaNumbers[i + 1]}</Typography>
                                            <ListItem disableGutters divider component={"div"}>
                                                <ListItemText primary={
                                                    <Typography>
                                                        <Typography component={"span"} color={"secondary"}>{item.headline}</Typography>
                                                        {!!item.subheadline ? ` / ${item.subheadline}` : ""}
                                                    </Typography>
                                                } disableTypography />
                                            </ListItem>
                                        </Box>
                                    </CardActionArea>
                                ))}
                            </Box>

                            {betweenXsAndLg && advertisementOne}
                        </Box>
                    </Grid>

                    <Grid item xs={12} lg={6} sm={7}>
                        <Box pt={2}>
                            {selectedNews}

                            {betweenXsAndLg && (
                                <React.Fragment>
                                    <Box pt={2}>
                                        <Divider />
                                    </Box>
                                    {selectedNewsRemaining}
                                </React.Fragment>

                            )}
                        </Box>
                    </Grid>

                    {!betweenXsAndLg && <Grid item xs={12} lg={3}>
                        <Box style={{ borderLeft: "1px solid rgba(0, 0, 0, 0.12)", paddingLeft: 10 }} height={"100%"}>
                            <Box pt={2} />
                            {advertisementOne}
                            <Divider />
                            <Box pt={2} />
                            {selectedNewsRemaining}
                        </Box>
                    </Grid>}
                </Grid>

                <Box py={2}>
                    <Divider />
                </Box>

                <Grid container justifyContent={"center"}>
                    <Grid item xs={12} lg={8}>
                        <img width={"100%"} src={"https://dummyimage.com/580x340/000/fff"} alt={"advertisement"} />
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment >
    )
}

export default DashboardPage