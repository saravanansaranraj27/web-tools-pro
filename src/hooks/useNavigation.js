import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PAGE_ROUTES = {
  intro: "/",
  password: "/password",
  status: "/status",
  wordcounter: "/wordcounter",
  mdreader: "/mdreader",
};

const ROUTE_PAGES = {
  "/": "intro",
  "/password": "password",
  "/status": "status",
  "/wordcounter": "wordcounter",
  "/mdreader": "mdreader",
};

const getPageFromPath = (pathname) => {
  return ROUTE_PAGES[pathname] || "intro";
};

export const useNavigation = (loadingDuration = 800) => {
  const location = useLocation();
  const routerNavigate = useNavigate();

  const currentPage = getPageFromPath(location.pathname);

  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const loadingTimer = useRef(null);

  useEffect(() => {
    clearTimeout(loadingTimer.current);

    loadingTimer.current = setTimeout(() => {
      setIsLoading(false);
    }, loadingDuration);

    return () => {
      clearTimeout(loadingTimer.current);
    };
  }, [location.pathname, loadingDuration]);

  const navigate = useCallback(
    (page, scrollToTop) => {
      const route = PAGE_ROUTES[page];

      if (!route) {
        return;
      }

      if (page === currentPage && !isLoading) {
        setIsMobileMenuOpen(false);
        return;
      }

      setIsMobileMenuOpen(false);
      setIsLoading(true);

      if (scrollToTop) {
        scrollToTop();
      }

      routerNavigate(route);
    },
    [currentPage, isLoading, routerNavigate],
  );

  return {
    activePage: currentPage,
    loadingPage: currentPage,
    isLoading,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    navigate,
  };
};
