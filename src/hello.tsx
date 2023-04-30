import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core';
// import { Grid, Typography, Card, CardContent, CardMedia, IconButton, Tooltip } from '@material-ui/core';

import { Grid, Typography, Card, CardContent, CardMedia, IconButton, Tooltip } from '@material-ui/core';


import { ArrowLeft, ArrowRight, PauseCircleFilled, PlayCircleFilled } from '@material-ui/icons';




interface Image {
  id: number;
  src: string;
  title: string;
  description: string;
}

const images: Image[] = [
  {
    id: 1,
    src: 'https://source.unsplash.com/random/400x400?1',
    title: 'Image 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 2,
    src: 'https://source.unsplash.com/random/400x400?2',
    title: 'Image 2',
    description: 'Praesent tincidunt consequat vestibulum. Donec quis purus ex.',
  },
  {
    id: 3,
    src: 'https://source.unsplash.com/random/400x400?3',
    title: 'Image 3',
    description: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.',
  },
  {
    id: 4,
    src: 'https://source.unsplash.com/random/400x400?4',
    title: 'Image 4',
    description: 'Aenean ultricies ante vel ex congue, id iaculis velit fringilla.',
  },
  {
    id: 5,
    src: 'https://source.unsplash.com/random/400x400?5',
    title: 'Image 5',
    description: 'Fusce eget ligula ac mauris pharetra sodales. Ut sed mi vestibulum.',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
  cardContent: {
    flexGrow: 1,
  },
  cardMedia: {
    height: 300,
    width: 300,
  },
  thumbnail: {
    height: 80,
    width: 80,
    margin: theme.spacing(1),
    filter: 'grayscale(100%)',
    '&:hover': {
      cursor: 'pointer',
      filter: 'grayscale(0%)',
    },
  },
  activeThumbnail: {
    filter: 'grayscale(0%)',
  },
  playPauseButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
  },
}));

const CatalogViewer: React.FC = () => {
  const classes = useStyles();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isPlaying) {
      intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
    }
    return () => clearInterval(intervalId);
  }, [isPlaying]);

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(false)};

const handlePrevClick = () => {
setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
setIsPlaying(false);
};

const handleNextClick = () => {
setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
setIsPlaying(false);
};
const handlePlayPauseClick = () => {
setIsPlaying((prevIsPlaying) => !prevIsPlaying);
};

return (
<div className={classes.root}>
<Card className={classes.card}>
<CardContent className={classes.cardContent}>
<Typography variant="h4" component="h2">
{images[currentIndex].title}
</Typography>
<Typography variant="body1" color="textSecondary" component="p">
{images[currentIndex].description}
</Typography>
</CardContent>
<CardMedia className={classes.cardMedia} image={images[currentIndex].src} title={images[currentIndex].title} />
{isPlaying ? (
<Tooltip title="Pause">
<IconButton className={classes.playPauseButton} onClick={handlePlayPauseClick}>
<PauseCircleFilled style={{ color: 'red' , fontSize: 50}}/>
</IconButton>
</Tooltip>
) : (
<Tooltip title="Play">

<IconButton className={classes.playPauseButton} onClick={handlePlayPauseClick}>
<PlayCircleFilled  style={{ color: 'green' , fontSize: 50}}/>
</IconButton>
</Tooltip>
)}
</Card>
<Grid container direction="row" justify="center" alignItems="center">
<Grid item>
<IconButton aria-label="previous" onClick={handlePrevClick}>
<ArrowLeft  style={{ color: 'blue' , fontSize: 50}}/>
</IconButton>
</Grid>
{images.map((image, index) => (
<Grid item key={image.id}>
<img
className={`${classes.thumbnail} ${currentIndex === index ? classes.activeThumbnail : ''}`}
src={image.src}
alt={image.title}
onClick={() => handleThumbnailClick(index)}
/>
</Grid>
))}<Grid item>
<IconButton aria-label="next" onClick={handleNextClick}>
<ArrowRight style={{ color: 'blue' , fontSize: 50}} />
</IconButton>
</Grid>
</Grid>
</div>
);
};

export default CatalogViewer;