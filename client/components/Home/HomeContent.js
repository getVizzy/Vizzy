import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import FileDrop from '../FileDrop'
import InviteForm from '../InviteForm'
import AddIcon from '@material-ui/icons/AddCircle'
import EmailIcon from '@material-ui/icons/Email'
import DashboardIcon from '@material-ui/icons/Dashboard'
import CreateIcon from '@material-ui/icons/Create'
import DataIcon from '@material-ui/icons/LibraryBooks'
import HappyIcon from '@material-ui/icons/TagFaces'
import UserDataSets from './UserDataSets'
import { Link } from 'react-router-dom'
import Tooltip from '@material-ui/core/Tooltip';


//images
const tiles = 'https://i.ibb.co/pLtgcSk/colorfultiles.jpg'
const teamworkImg = 'https://i.ibb.co/8Y1QRnT/teamwork-jpg.jpg'
const dataImg = 'https://i.ibb.co/vxQtwMt/data.jpg'
const graphsImg = 'https://i.ibb.co/5Bn5r99/allcharts5.jpg'
const createGraphImg = 'https://i.ibb.co/7kxh190/allcharts4.jpg'
const libraryImg = 'https://i.ibb.co/9hTyvy1/library.jpg'
const logoImg = 'https://i.ibb.co/gd3w2qb/VizLogo.png'

const styles = theme => ({
  appBar: {
    position: 'relative'
  },
  icon: {
    marginRight: theme.spacing.unit * 2
  },
  heroUnit: {
    // backgroundColor: theme.palette.background.paper,
    backgroundImage: tiles
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  cardGrid: {
    // padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
    paddingTop: '56.25%' // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 3,
    marginTop: 35
  },
  contentIcon: {
    marginRight: 20
  }
})

const HomeContent = props => {
  const { classes } = props
  return (
    <React.Fragment>
      <CssBaseline />

      <main>
        {/* Hero unit */}
        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Welcome Home
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="textSecondary"
              paragraph
            >
              Let's get Vizzy
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="textSecondary"
              paragraph
            >
              Create . Collaborate . Visualize
            </Typography>
            <div className={classes.heroButtons}>
              {/* <Grid container spacing={16} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Main call to action
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Secondary action
                  </Button>
                </Grid>
              </Grid> */}
            </div>
          </div>
        </div>
        <div className={classNames(classes.layout, classes.cardGrid)}>
          {/* End hero unit */}
          <Grid container spacing={40}>

            {/* card 1 */}
            <Grid item sm={6} md={4} lg={3}>

              <Card className={classes.card}>
                <Tooltip title={`click 'IMPORT HERE' below`} placement="bottom">
                  <CardMedia
                    className={classes.cardMedia}
                    image={dataImg} // eslint-disable-line max-len
                  // title="Image title"
                  />
                </Tooltip >

                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    <AddIcon className={classes.contentIcon} color="primary" />
                    Data Import
                  </Typography>
                  <Typography>
                    Have data? You can upload it here and we'll keep it handy
                    for you when it's time to get graphing.
                  </Typography>
                </CardContent>
                <CardActions>
                  <FileDrop />
                  {/* <Button size="small" color="primary">
                    View
                    </Button>
                  <Button size="small" color="primary">
                    Edit
                    </Button> */}
                </CardActions>

              </Card>


            </Grid>

            {/* ))} */}

            {/* card 2 */}
            <Grid item sm={6} md={4} lg={3}>
              <Card className={classes.card}>
                <Tooltip title={`click 'INVITE HERE' below`} placement="bottom">
                  <CardMedia
                    className={classes.cardMedia}
                    image={teamworkImg} // eslint-disable-line max-len
                  // title="Image title"
                  />
                </Tooltip>
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    <EmailIcon
                      className={classes.contentIcon}
                      color="primary"
                    />
                    {'Invite & Collaborate'}
                  </Typography>
                  <Typography>
                    Data visualization is more fun when collaborating with
                    others. Invite team members to collaborate in real-time to
                    build interactive and insightful graphs.
                  </Typography>
                </CardContent>
                <CardActions>

                  <InviteForm user={props.user} />
                </CardActions>
              </Card>
            </Grid>

            {/* card 3 */}
            <Grid item sm={6} md={4} lg={3}>
              <Card className={classes.card}>
                <Tooltip title={`click 'GRAPH HERE' below`} placement="bottom">
                  <CardMedia
                    className={classes.cardMedia}
                    image={createGraphImg} // eslint-disable-line max-len
                  // title="Image title"
                  />
                </Tooltip>
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    <Link to="/room">
                      <CreateIcon
                        className={classes.contentIcon}
                        color="primary"
                      />
                    </Link>
                    Solo Grapher
                  </Typography>
                  <Typography>
                    Don't need to collaborate? You can start graphing right away
                    and still gain meaningful insights from your data.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    <Link to="/room">Graph here</Link>
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            {/* card 4 */}
            <Grid item sm={6} md={4} lg={3}>
              <Card className={classes.card}>
                <Tooltip title={`click 'DASHBOARD HERE' below`} placement="bottom">
                  <CardMedia
                    className={classes.cardMedia}
                    image={graphsImg} // eslint-disable-line max-len
                  // title="Image title"
                  />
                </Tooltip>
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    <Link to="/dashboard">
                      <DashboardIcon
                        className={classes.contentIcon}
                        color="primary"
                      />
                    </Link>
                    {`View Past Graphs`}
                  </Typography>
                  <Typography>
                    View all of the interative graphs that you have crafted in
                    one central dashboard. You can download and share these
                    graphs to assist in meaningful discussions and decision
                    making processes.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    <Link to="/dashboard">Dashboard here</Link>
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            {/* card 5 */}
            <Grid item sm={6} md={4} lg={3}>
              <Card className={classes.card}>
                <Tooltip title='toggle below to view/close data list' placement="bottom">

                  <CardMedia
                    className={classes.cardMedia}
                    image={libraryImg} // eslint-disable-line max-len
                  // title="Image title"
                  />
                </Tooltip>
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    <DataIcon className={classes.contentIcon} color="primary" />
                    Your Datasets
                  </Typography>
                  <Typography>
                    View a listing of the datasets you have imported
                  </Typography>
                </CardContent>
                <UserDataSets userData={props.userData} />
              </Card>
            </Grid>

            {/* card 6 */}
            <Grid item sm={6} md={4} lg={3}>
              <Card className={classes.card}>
                <Tooltip title={`click 'FUN HERE' below`} placement="bottom">
                  <CardMedia
                    className={classes.cardMedia}
                    image={tiles} // eslint-disable-line max-len
                  // title="Image title"
                  />
                </Tooltip>
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    <Link to="/fun"> <HappyIcon
                      className={classes.contentIcon}
                      color="primary"
                    /></Link>
                    Bored?
                  </Typography>
                  <Typography>
                    Take a peek at an interesting graph curated just for you.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link to="/fun"><Button size="small" color="primary">
                    Fun Here
                  </Button></Link>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </div>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          <img src={logoImg} width="150" height="60" />
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Data Visualization made simple, interactive, and collaborative
        </Typography>
      </footer>
      {/* End footer */}
    </React.Fragment>
  )
}

HomeContent.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  data: state.data,
  user: state.user.user,
  rooms: state.room.rooms,
  singleRoom: state.room.singleRoom,
  allUsers: state.user.allUsers
})

export default connect(mapStateToProps)(withStyles(styles)(HomeContent))
