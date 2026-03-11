const SpecialistCard = ({ data }) => {
    if (!data) return null;

    return (
        <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-md)',
            marginTop: '2rem',
            maxWidth: '800px',
            width: '100%',
            borderTop: '5px solid var(--color-primary)'
        }}>
            <h3 style={{ color: 'var(--color-primary)', fontSize: '1.5rem', marginBottom: '1rem' }}>
                Recommended Specialist: {data.specialist}
            </h3>
            <p style={{ color: 'var(--color-text-main)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                {data.message}
            </p>

            <div style={{ backgroundColor: 'var(--color-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem' }}>
                <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Common Treatments:</strong>
                <ul style={{ paddingLeft: '1.5rem', color: 'var(--color-text-muted)' }}>
                    {data.treatments.map((treatment, i) => (
                        <li key={i}>{treatment}</li>
                    ))}
                </ul>
            </div>

            <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Nearby Clinics</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
                {data.clinics && data.clinics.map((clinic) => (
                    <div key={clinic._id} style={{
                        border: '1px solid var(--color-secondary)',
                        padding: '1rem',
                        borderRadius: 'var(--radius-md)',
                        transition: 'transform var(--transition-fast)'
                    }}>
                        <h5 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{clinic.clinicName}</h5>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{clinic.location.address}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                            <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>{clinic.distance}</span>
                            <span style={{ backgroundColor: 'var(--color-secondary)', padding: '2px 6px', borderRadius: 'var(--radius-sm)' }}>
                                {clinic.priceCategory} • ★ {clinic.rating}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SpecialistCard;
