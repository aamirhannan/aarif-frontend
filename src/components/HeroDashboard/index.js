import React, { useState, useEffect } from "react";
import Image from "next/image";
import "./hero-dashboard.scss";
import CustomButton from "../Button";
import { Chip, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const categoryMap = {
    ENVIRONMENT: "Environment",
    HEALTH: "Health",
    EDUCATION: "Education",
    WOMEN_EMPOWERMENT: "Women Empowerment",
    ANIMAL_WELFARE: "Animal Welfare",
    CHILD_WELFARE: "Child Welfare",
    DISASTER_RELIEF: "Disaster Relief",
    CLEANLINESS_SANITATION: "Cleanliness & Sanitation",
    HUNGER_FOOD_SECURITY: "Hunger & Food Security"
};

const HeroDashboard = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 600);
        };

        handleResize(); // Initial check
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <header className="hero-header">
                <div className="hero-logo">
                    <Image
                        src="/images/logo.png"
                        alt="CauseBag Logo"
                        width={150}
                        height={50}
                        priority
                    />
                </div>
                {isMobile ? (
                    <>
                        <IconButton
                            edge="end"
                            color="primary"
                            aria-label="menu"
                            onClick={handleMenuOpen}
                            className="mobile-menu-button"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={handleMenuClose}>
                                See All Causes
                            </MenuItem>
                            <MenuItem onClick={handleMenuClose}>
                                Login as Admin
                            </MenuItem>
                        </Menu>
                    </>
                ) : (
                    <div className="hero-nav">
                        <CustomButton
                            variant="outline"
                            size="medium"
                            btnText="See All Causes"
                            btnClick={() => { }}
                            className="nav-button"
                        />
                        <CustomButton
                            variant="primary"
                            size="medium"
                            btnText="Login as Admin"
                            btnClick={() => { }}
                            className="nav-button"
                        />
                    </div>
                )}
            </header>
            <section className="hero-dashboard">
                <div className="hero-content">
                    <h1 className="hero-title">Support a Cause. Carry the Message.</h1>
                    <h2 className="hero-subtitle">
                        Sponsor. Claim. Inspire change through every tote.
                    </h2>
                    <div className="hero-cta-container">
                        <CustomButton
                            variant="primary"
                            size="large"
                            btnText="Post a Cause"
                            btnClick={() => { }}
                            className="hero-cta-button"
                        />
                        <CustomButton
                            variant="secondary"
                            size="large"
                            btnText="Sponsor a Cause"
                            btnClick={() => { }}
                            className="hero-cta-button"
                        />
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="hero-visual-chips">
                        {Object.entries(categoryMap).map(([key, value], index) => (
                            <Chip
                                key={key}
                                label={value}
                                className={`floating-chip floating-chip-${index + 1}`}
                                variant="filled"
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default HeroDashboard;
