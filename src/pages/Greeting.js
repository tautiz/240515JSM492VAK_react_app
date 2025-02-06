import { useState, useEffect, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import PropTypes from 'prop-types';

// Custom components for markdown rendering
const MarkdownComponents = {
    // Heading components with consistent styling pattern
    h1: ({ children, ...props }) => (
        <h1 
            className="font-bold leading-snug tracking-tight text-slate-800 my-6 w-full text-2xl lg:max-w-3xl lg:text-5xl" 
            {...props}
        >
            {children}
        </h1>
    ),
    h2: ({ children, ...props }) => (
        <h2 
            className="font-bold leading-snug tracking-normal text-slate-800 my-6 w-full text-2xl lg:max-w-3xl lg:text-4xl" 
            {...props}
        >
            {children}
        </h2>
    ),
    h3: ({ children, ...props }) => (
        <h3 
            className="font-semibold leading-snug tracking-normal text-slate-800 my-6 w-full text-xl max-w-lg lg:max-w-2xl lg:text-3xl" 
            {...props}
        >
            {children}
        </h3>
    ),
    h4: ({ children, ...props }) => (
        <h3 
            className="font-light leading-snug tracking-normal text-slate-800 my-6 w-full text-lg max-w-md lg:max-w-xl lg:text-2xl" 
            {...props}
        >
            {children}
        </h3>
    ),
    // Link component with hover state
    p: ({ children, ...props }) => (
        <p 
            className="font-normal leading-relaxed text-slate-500 lg:text-lg text-base w-full m-2"
            {...props}
        >
            {children}
        </p>
    ),
    // Code component with inline/block variants
    code: ({ children, inline, ...props }) => {
        const baseStyles = "inline font-mono text-sm bg-gray-800 text-gray-100 rounded p-1";
        const inlineStyles = "inline font-mono text-sm px-1.5 py-0.5";
        const blockStyles = "inline font-mono text-sm block p-4 overflow-x-auto";
        
        return (
            <code 
                className={`${baseStyles} ${inline ? inlineStyles : blockStyles}`}
                {...props}
            >
                {children}
            </code>
        );
    },
    // Pre component for code blocks
    pre: ({ children, ...props }) => (
        <pre 
            className="bg-gray-800 text-gray-100 rounded-md p-4 overflow-x-auto" 
            {...props}
        >
            {children}
        </pre>
    ),
};

// Prop types for markdown components
Object.entries(MarkdownComponents).forEach(([key, Component]) => {
    Component.propTypes = {
        children: PropTypes.node,
        inline: key === 'code' ? PropTypes.bool : undefined,
        href: key === 'a' ? PropTypes.string : undefined,
    };
});

function Greeting() {
    const [markdownContent, setMarkdownContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const greeting = useMemo(() => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
    }, []);

    useEffect(() => {
        const controller = new AbortController();

        const fetchReadme = async () => {
            try {
                const response = await fetch('/Lesson_data/REACT_ROUTING.md', {
                    signal: controller.signal
                });
                if (!response.ok) {
                    throw new Error(`Failed to load README content (${response.status})`);
                }
                const text = await response.text();
                setMarkdownContent(text);
                setError(null);
            } catch (err) {
                if (err.name === 'AbortError') return;
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchReadme();

        return () => controller.abort();
    }, []);

    return (
        <div className="p-5 mx-auto">
            <div className="text-slate-700 mb-8 pb-3 border-b-2 border-gray-200">
                {greeting}
            </div>
            
            {isLoading && (
                <div className="text-center p-5">
                    Loading file content...
                </div>
            )}
            
            {error && (
                <div className="p-4 bg-red-50 text-red-800 rounded mb-5">
                    Error: {error}
                </div>
            )}
            
            {!isLoading && !error && (
                <div className="bg-white p-5 rounded-lg shadow-md leading-relaxed">
                    <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={MarkdownComponents}
                    >
                        {markdownContent}
                    </ReactMarkdown>
                </div>
            )}
        </div>
    );
}

export default Greeting;