import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { getPublicItem } from "../../../utils/api";
import {
    Box,
    MapPin,
    Tag as TagIcon,
    Calendar,
    Package,
    Link as LinkIcon,
    AlertCircle,
    ChevronRight,
    Info,
    Copy,
    Check,
    Share2
} from "lucide-react";
import "../../../styles/global.css";
import "../../../styles/public-share.css";

const PublicItemPage = ({ params }) => {
    const shareToken = params?.shareToken;
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeImage, setActiveImage] = useState(0);
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
        const fetchItem = async () => {
            try {
                setLoading(true);
                const response = await getPublicItem(shareToken);
                if (response.data && response.data.getPublicItem) {
                    setItem(response.data.getPublicItem);
                } else if (response.errors) {
                    setError(response.errors[0].message);
                } else {
                    setError("Item not found or share has expired.");
                }
            } catch (err) {
                console.error("Error fetching public item:", err);
                setError("Failed to load item. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        if (shareToken) {
            fetchItem();
        } else {
            setLoading(false);
            setError("No share token provided.");
        }
    }, [shareToken]);

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="page-container">
                    <Header />
                    <div className="container" style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div className="loading-container">
                            <div className="loading-spinner"></div>
                            <h2>Retrieving shared item...</h2>
                            <p>Fetching details from the StashDog vault.</p>
                        </div>
                    </div>
                    <Footer />
                </div>
        );
    }

    if (error || !item) {
        return (
            <div className="page-container">
                    <Header />
                    <div className="container" style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div className="error-container">
                            <AlertCircle size={64} color="var(--color-accent)" className="mb-8" />
                            <h1 className="error-title">Oops!</h1>
                            <h2>{error || "Item not found"}</h2>
                            <p className="mb-8">This share link might be invalid, expired, or revoked by the owner.</p>
                            <a href="/" className="cta-button">Go Back Home</a>
                        </div>
                    </div>
                    <Footer />
                </div>
        );
    }

    const hasImages = item.images && item.images.length > 0;
    const currentImages = item.images || [];

    return (
        <div className="page-container">
                <Helmet>
                    <title>{item.name} | Shared on StashDog</title>
                    <meta name="description" content={item.description || `View shared item: ${item.name}`} />
                    <meta property="og:title" content={`${item.name} | Shared on StashDog`} />
                    <meta property="og:description" content={item.description || `View shared item: ${item.name}`} />
                    {hasImages && <meta property="og:image" content={currentImages[0].urls.preview} />}
                </Helmet>

                <Header />

                <main className="container public-share-page" style={{ flexGrow: 1 }}>
                    <div className="item-main-container">
                        {/* Left Column: Images */}
                        <div className="item-image-section">
                            <div className="main-image-wrapper">
                                {hasImages ? (
                                    <img
                                        src={currentImages[activeImage].urls.full || currentImages[activeImage].urls.preview}
                                        alt={item.name}
                                    />
                                ) : (
                                    <div className="empty-image-placeholder" style={{
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: 'var(--bg-card)',
                                        color: 'var(--text-muted)'
                                    }}>
                                        <Package size={80} />
                                    </div>
                                )}
                            </div>

                            {currentImages.length > 1 && (
                                <div className="thumbnail-grid">
                                    {currentImages.map((img, idx) => (
                                        <div
                                            key={img.id}
                                            className={`thumbnail-item ${activeImage === idx ? 'active' : ''}`}
                                            onClick={() => setActiveImage(idx)}
                                        >
                                            <img src={img.urls.thumbnail} alt={`${item.name} thumbnail ${idx + 1}`} />
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="item-meta mt-8">
                                <div className="meta-row">
                                    <span className="meta-label">
                                        <Calendar size={14} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                                        Shared On
                                    </span>
                                    <span className="meta-value">{formatDate(item.createdAt)}</span>
                                </div>
                                <div className="meta-row">
                                    <span className="meta-label">
                                        <AlertCircle size={14} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                                        Last Updated
                                    </span>
                                    <span className="meta-value">{formatDate(item.updatedAt)}</span>
                                </div>
                                {item.tags && item.tags.length > 0 && (
                                    <div className="meta-row" style={{ borderBottom: 'none', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start' }}>
                                        <span className="meta-label">
                                            <TagIcon size={14} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                                            Tags
                                        </span>
                                        <div className="item-tags" style={{ marginBottom: 0 }}>
                                            {item.tags.map(tag => (
                                                <span key={tag} className="item-tag">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column: Details */}
                        <div className="item-info-section">
                            <div className="item-header">
                                <div className="badge badge-public">Public Share</div>
                                <h1 className="item-title">{item.name}</h1>
                            </div>

                            <div className="item-description">
                                {item.description || "No description provided for this item."}
                            </div>

                            <div className="info-card variant-highlight mb-8">
                                <div className="info-card-header">
                                    <div className="info-card-icon">
                                        <Info size={20} />
                                    </div>
                                    <div>
                                        <h3 className="info-card-title">Read-Only Access</h3>
                                        <p className="info-card-description" style={{ margin: 0, fontSize: '0.9rem' }}>
                                            You are viewing a publicly shared item. Sensitive information such as exact location and owner details are hidden for privacy.
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
                    </div>

                    {/* Contained Items Section */}
                    {item.containedItems && item.containedItems.length > 0 && (
                        <div className="related-section">
                            <h2 className="section-title">
                                <Box size={32} color="var(--color-primary)" />
                                Contained Items
                            </h2>
                            <div className="item-grid">
                                {item.containedItems.map(containedItem => (
                                    <div key={containedItem.id} className="public-item-card">
                                        <div className="card-image">
                                            {containedItem.images && containedItem.images.length > 0 ? (
                                                <img src={containedItem.images[0].urls.preview} alt={containedItem.name} />
                                            ) : (
                                                <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#222' }}>
                                                    <Package size={40} color="#444" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="card-content">
                                            <h3 className="card-title">{containedItem.name}</h3>
                                            <p className="card-description">{containedItem.description || "No description provided."}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Related Items Section */}
                    {item.relatedItems && item.relatedItems.length > 0 && (
                        <div className="related-section">
                            <h2 className="section-title">
                                <LinkIcon size={32} color="var(--color-primary)" />
                                Related Items
                            </h2>
                            <div className="item-grid">
                                {item.relatedItems.map(relatedItem => (
                                    <div key={relatedItem.id} className="public-item-card">
                                        <div className="card-image">
                                            {relatedItem.images && relatedItem.images.length > 0 ? (
                                                <img src={relatedItem.images[0].urls.preview} alt={relatedItem.name} />
                                            ) : (
                                                <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#222' }}>
                                                    <Package size={40} color="#444" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="card-content">
                                            <h3 className="card-title">{relatedItem.name}</h3>
                                            <p className="card-description">{relatedItem.description || "No description provided."}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </main>

                <Footer />
            </div>
    );
};

export default PublicItemPage;
