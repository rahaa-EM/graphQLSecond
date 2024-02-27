const Title = () => {
    const styles = getStyles();
    return <h1 style={styles.title}>People and Their Cars</h1>
};

const getStyles = () => {
    return {
        title: {
            fontSize: '20px',
            paddingBottom: '15px',
            marginBottom: '15px',
            borderBottom: '2px solid #ddd',
            textTransform: 'uppercase'
        }
    };
};

export default Title;