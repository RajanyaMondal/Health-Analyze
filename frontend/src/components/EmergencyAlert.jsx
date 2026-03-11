const EmergencyAlert = ({ message }) => {
    return (
        <div style={{
            backgroundColor: 'var(--color-danger-bg)',
            color: 'var(--color-danger)',
            padding: '1.5rem',
            borderRadius: 'var(--radius-md)',
            marginTop: '2rem',
            borderLeft: '4px solid var(--color-danger)',
            maxWidth: '800px',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            boxShadow: 'var(--shadow-sm)'
        }}>
            <div style={{
                backgroundColor: 'var(--color-danger)',
                color: 'white',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                flexShrink: 0
            }}>!</div>
            <div>
                <h3 style={{ margin: 0, fontWeight: 'bold' }}>Emergency Alert</h3>
                <p style={{ margin: '0.5rem 0 0 0' }}>{message}</p>
            </div>
        </div>
    );
};

export default EmergencyAlert;
