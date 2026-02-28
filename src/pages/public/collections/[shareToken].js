import React, { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { getPublicCollection, recordShareView } from "../../../utils/api";
import {
    Box,
    Package,
    AlertCircle,
    ChevronRight,
    Info,
    Copy,
    Check,
    Layers
} from "lucide-react";
import "../../../styles/global.css";
import "../../../styles/public-share.css";

const PublicCollectionPage = ({ params }) => {
    const shareToken = params?.shareToken;
    const [collection, setCollection] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        if (typeof window !== 'undefined') {
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            });
        }
    };

    useEffect(() => {
        const fetchCollection = async () => {
            try {
                setLoading(true);
                const response = await getPublicCollection(shareToken);
                if (response.data && response.data.getPublicCollection) {
                    setCollection(response.data.getPublicCollection);
                    // Record share view for analytics
                    recordShareView(shareToken, 'web');
                } else if (response.error) {
                    setError(response.error);
                } else {
                    setError("Collection not found or share has expired.");
                }
            } catch (err) {
                console.error("Error fetching public collection:", err);
                setError("Failed to load collection. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        if (shareToken) {
            fetchCollection();
        } else {
            setLoading(false);
            setError("No share token provided.");
        }
    }, [shareToken]);

    if (loading) {
        return (
            <HelmetProvider>
                <div className="page-container">
                    <Header />
                    <div className="container" style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div className="loading-container">
                            <div className="loading-spinner"></div>
                            <h2>Retrieving shared collection...</h2>
                            <p>Fetching details from the StashDog vault.</p>
                        </div>
                    </div>
                    <Footer />
                </div>
            </HelmetProvider>
        );
    }

    if (error || !collection) {
        return (
            <HelmetProvider>
                <div className="page-container">
                    <Header />
                    <div className="container" style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div className="error-container">
                            <AlertCircle size={64} color="var(--color-accent)" className="mb-8" />
                            <h1 className="error-title">Oops!</h1>
                            <h2>{error || "Collection not found"}</h2>
                            <p className="mb-8">This share link might be invalid, expired, or revoked by the owner.</p>
                            <a href="/" className="cta-button">Go Back Home</a>
                        </div>
                    </div>
                    <Footer />
                </div>
            </HelmetProvider>
        );
    }

    return (
        <HelmetProvider>
            <div className="page-container">
                <Helmet>
                    <title>{collection.name} | Shared on StashDog</title>
                    <meta name="description" content={collection.description || `View shared collection: ${collection.name}`} />
                    <meta property="og:title" content={`${collection.name} | Shared on StashDog`} />
                    <meta property="og:description" content={collection.description || `View shared collection: ${collection.name}`} />
                </Helmet>

                <Header />

                <main className="container public-share-page" style={{ flexGrow: 1 }}>
                    <div className="collection-header-section">
                        <div className="collection-header">
                            <div className="badge badge-public">Public Share</div>
                            <h1 className="collection-title">{collection.name}</h1>
                            
                            <div className="collection-meta-inline">
                                <div className="meta-badge">
                                    <Layers size={16} />
                                    <span>{collection.itemCount} {collection.itemCount === 1 ? 'Item' : 'Items'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="collection-description">
                            {collection.description || "No description provided for this collection."}
                        </div>

                        <div className="info-card variant-highlight mb-8">
                            <div className="info-card-header">
                                <div className="info-card-icon">
                                    <Info size={20} />
                                </div>
                                <div>
                                    <h3 className="info-card-title">Read-Only Access</h3>
                                    <p className="info-card-description" style={{ margin: 0, fontSize: '0.9rem' }}>
                                        You are viewing a publicly shared collection. Sensitive information such as exact locations and owner details are hidden for privacy.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="cta-buttons" style={{ justifyContent: 'flex-start', gap: '1rem' }}>
                            <a href="https://app.stashdog.io" target="_blank" rel="noopener noreferrer" className="cta-button">
                                Try StashDog Free <ChevronRight size={16} style={{ marginLeft: '0.5rem' }} />
                            </a>
                            <button
                                onClick={copyToClipboard}
                                className="cta-button outline"
                                style={{ textTransform: 'none' }}
                            >
                                {copied ? (
                                    <><Check size={16} style={{ marginRight: '0.5rem' }} /> Copied!</>
                                ) : (
                                    <><Copy size={16} style={{ marginRight: '0.5rem' }} /> Copy Link</>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Collection Items Section */}
                    {collection.itemCount > 0 ? (
                        <div className="related-section">
                            <h2 className="section-title">
                                <Box size={32} color="var(--color-primary)" />
                                Items in This Collection
                            </h2>
                            <div className="empty-state">
                                <Package size={64} color="var(--text-muted)" style={{ margin: '0 auto 1rem' }} />
                                <h3>Collection Items Coming Soon</h3>
                                <p>The full item listing for this collection will be available in a future update.</p>
                                <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
                                    For now, you can see that this collection contains {collection.itemCount} {collection.itemCount === 1 ? 'item' : 'items'}.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="related-section">
                            <div className="empty-state">
                                <Package size={64} color="var(--text-muted)" style={{ margin: '0 auto 1rem' }} />
                                <h3>Empty Collection</h3>
                                <p>This collection doesn't have any items yet.</p>
                            </div>
                        </div>
                    )}
                </main>

                <Footer />
            </div>
        </HelmetProvider>
    );
};

export default PublicCollectionPage;
