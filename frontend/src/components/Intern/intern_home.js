import React, { useState, useEffect } from 'react';
import axios from 'axios'
const AnalogClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const seconds = time.getSeconds() * 6; // 360 / 60
  const minutes = time.getMinutes() * 6 + seconds / 60;
  const hours = time.getHours() % 12 * 30 + minutes / 12; // 360 / 12

  const styles = {
    clockContainer: {
      width: '200px',
      height: '200px',
      backgroundColor: 'none',
      borderRadius: '20px',
      padding: '20px',
    //   boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px',
    },
    title: {
      fontSize: '16px',
      color: '#666',
      marginBottom: '10px',
    },
    clock: {
      position: 'relative',
      width: '150px',
      height: '150px',
      border: '1px solid black',
      borderRadius: '50%',
      padding: '10px',
    },
    clockFace: {
      width: '100%',
      height: '100%',
      position: 'relative',
      backgroundColor: 'none',
      borderRadius: '50%',
    },
    center: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      backgroundColor: '#333',
      transform: 'translate(-50%, -50%)',
      zIndex: 4,
    },
    hourHand: {
      position: 'absolute',
      bottom: '50%',
      left: '50%',
      width: '4px',
      height: '25%',
      backgroundColor: '#333',
      transformOrigin: 'bottom',
      transform: `translateX(-50%) rotate(${hours}deg)`,
      zIndex: 3,
    },
    minuteHand: {
      position: 'absolute',
      bottom: '50%',
      left: '50%',
      width: '3px',
      height: '35%',
      backgroundColor: '#666',
      transformOrigin: 'bottom',
      transform: `translateX(-50%) rotate(${minutes}deg)`,
      zIndex: 2,
    },
    secondHand: {
      position: 'absolute',
      bottom: '50%',
      left: '50%',
      width: '2px',
      height: '40%',
      backgroundColor: '#FF69B4',
      transformOrigin: 'bottom',
      transform: `translateX(-50%) rotate(${seconds}deg)`,
      zIndex: 1,
    },
    timeText: {
      fontSize: '20px',
      color: '#333',
      marginTop: '15px',
      fontWeight: '500',
    }
  };

  return (
    <div style={styles.clockContainer}>
      {/* <div style={styles.title}>Let's Start </div> */}
      <div style={styles.clock}>
        <div style={styles.clockFace}>
          {/* Clock hands */}
          <div style={styles.hourHand}></div>
          <div style={styles.minuteHand}></div>
          <div style={styles.secondHand}></div>
          <div style={styles.center}></div>
        </div>
      </div>
      {/* <div style={styles.timeText}>
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div> */}
    </div>
  );
};

const Home = ({ setSelectedView }) => {
    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState({
      courseProgress: { count: 0, percentage: 0 },
      jobStatus: { applied: 0, shortlisted: 0, total: 0 },
      testsAttended: { completed: 0, passed: 0, total: 0 },
    });
    const [userName, setUserName] = useState('User');
  
    useEffect(() => {
      fetchDashboardData();
    }, []);
  
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/dashboard-data');
        if (response.ok) {
          const data = await response.json();
          setDashboardData(data);
          setUserName(data.userName || 'User');
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
  
    const cardData = [
      { 
        title: 'Course Progress',
        color: '#1f2c39',
        icon: '📚',
        mainText: `${dashboardData.courseProgress.count} Courses`,
        subText: `${dashboardData.courseProgress.percentage}% Completed`,
        view: 'LMS' // Specify view name for each card
      },
      { 
        title: 'Jobs Status',
        color: '#1f2c39',
        icon: '✍️',
        mainText: `${dashboardData.jobStatus.shortlisted} Shortlisted`,
        subText: `${dashboardData.jobStatus.applied} Applications`,
        view: 'Applied'
      },
      { 
        title: 'Tests Attended',
        color: '#1f2c39',
        icon: '📑',
        mainText: `${dashboardData.testsAttended.completed} Completed`,
        subText: `${dashboardData.testsAttended.passed} Passed`,
        view: 'Quiz'
      }
    ];
  
    const styles = {
      container: {
        padding: '24px',
        maxWidth: '1200px',
        margin: '0 auto',
      },
      header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px',
      },
      greeting: {
        fontSize: '28px',
        fontWeight: '600',
        color: '#2D3748',
      },
      content: {
        display: 'grid',
        gap: '24px',
      },
      cardsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '16px',
      },
      card: {
        padding: '24px',
        borderRadius: '12px',
        cursor: 'pointer',
      },
      cardContent: {
        display: 'flex',
        flexDirection: 'column',
        color: 'white',
      },
      icon: {
        fontSize: '32px',
        marginBottom: '8px',
      },
      cardTitle: {
        fontSize: '18px',
        fontWeight: '500',
        marginBottom: '4px',
      },
      mainText: {
        fontSize: '24px',
        fontWeight: '600',
        marginTop: '8px',
      },
      subText: {
        fontSize: '14px',
        opacity: '0.9',
        marginTop: '4px',
      },
      refreshButton: {
        padding: '8px 16px',
        backgroundColor: '#013356',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        marginLeft: '16px',
      },
    };
  
    if (loading) {
      return (
        <div style={styles.loadingOverlay}>
          <div>Loading dashboard data...</div>
        </div>
      );
    }
  
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.greeting}>
            Hello, {userName}!
          </h1>
        </div>
        <div style={styles.content}>
          <div style={styles.cardsGrid}>
            {cardData.map((card, index) => (
              <div 
                key={index}
                style={{
                  ...styles.card,
                  backgroundColor: card.color,
                }}
                onClick={() => setSelectedView(card.view)} // Set selected view on click
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <div style={styles.cardContent}>
                  <span style={styles.icon}>{card.icon}</span>
                  <h3 style={styles.cardTitle}>{card.title}</h3>
                  <div style={styles.mainText}>{card.mainText}</div>
                  <div style={styles.subText}>{card.subText}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default Home;
  
// import React, { useState, useEffect } from 'react';
// import { 
//   Card, CardContent, Typography, Button, Grid, LinearProgress, Box, CircularProgress 
// } from '@mui/material';
// import Cookies from 'js-cookie';
// import apiService from '../../apiService';

// function Home({setSelectedView}) {
//     const [pdf, setPdf] = useState(null);
//     const [achievementVisible, setAchievementVisible] = useState(false);
//     const [courseStatus, setCourseStatus] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const internID = Cookies.get('internID');

//     useEffect(() => {
//         fetchCourseProgress();
//     }, []);

//     const fetchCourseProgress = async () => {
//         try {
//             setLoading(true);
//             const response = await apiService.get(`/api/intern-progress/${internID}`);
//             console.log(response.data);
//             setCourseStatus(response.data.courseData || []);
//         } catch (error) {
//             console.error('Error fetching course progress:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const closeContent = () => {
//         setPdf(null);
//         setAchievementVisible(false);
//     };

//     const handleContinue = () => {
//         setSelectedView('LMS');
//       };

//     if (loading) {
//         return (
//             <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//                 <CircularProgress />
//             </Box>
//         );
//     }

//     return (
//         <Grid container spacing={3}>
//             <Grid item xs={12}>
//                 <Typography variant="h5" gutterBottom>
//                     Course Progress
//                 </Typography>
//                 <Grid container spacing={3}>
//                     {courseStatus.map((course, index) => {
//                         const { course_name, completed_materials, total_materials } = course;
//                         const progress = (completed_materials / total_materials) * 100;

//                         return (
//                             <Grid item xs={12} sm={6} md={4} key={index}>
//                                 <Card>
//                                     <CardContent>
//                                         <Typography variant="body1">{course_name}</Typography>
//                                         <LinearProgress variant="determinate" value={progress} />
//                                         <Typography variant="body2">
//                                             {completed_materials} / {total_materials} completed
//                                         </Typography>
//                                         <Button variant="outlined" color="primary" sx={{ mt: 1 }} onClick={handleContinue}>
//                                             Continue Learning
//                                         </Button>
//                                     </CardContent>
//                                 </Card>
//                             </Grid>
//                         );
//                     })}
//                 </Grid>
//             </Grid>

//             {(pdf || achievementVisible) && (
//                 <Grid item xs={12}>
//                     <Card>
//                         <CardContent>
//                             <Button onClick={closeContent} variant="contained" sx={{ mb: 2 }}>
//                                 Close
//                             </Button>
//                             {pdf && (
//                                 <Box component="iframe" src={pdf} width="100%" height="600px" border="none" />
//                             )}
//                             {achievementVisible && (
//                                 <Box>
//                                     <Typography variant="h6">Achievement</Typography>
//                                     <Typography>Here you can display details about the achievements.</Typography>
//                                 </Box>
//                             )}
//                         </CardContent>
//                     </Card>
//                 </Grid>
//             )}
//         </Grid>
//     );
// }

// export default Home;

