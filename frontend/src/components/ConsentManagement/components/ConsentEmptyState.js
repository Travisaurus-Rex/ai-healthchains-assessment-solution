const ConsentEmptyState = () => {
    return (
        <div className="empty-state">
            <div className="empty-state-icon">
                <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                >
                <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10
                    10-4.48 10-10S17.52 2 12 2zm0 15h-1v-6h2v6h-1zm0-8h-1V7h2v2h-1z"
                    fill="currentColor"
                />
                </svg>
            </div>

            <span>No consents found.</span>
        </div>
    )
}

export default ConsentEmptyState;