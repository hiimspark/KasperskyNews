import React, { useState } from 'react';
import { Tag, Avatar} from 'antd';
import { GlobalOutlined, ReadOutlined, TeamOutlined, CaretDownOutlined, CaretUpOutlined, BorderOutlined, InfoCircleOutlined, UpOutlined, DownOutlined} from '@ant-design/icons';
import './NewsSnippet.css';

interface IData_TagItem {
    value: string;
    count: number;
}

interface IData_TrafficItem {
    value: string;
    count: number;
}

export interface IData_SnippetNews {
    ID: number;
    TI: string;
    AB: string;
    URL: string;
    DOM: string;
    DP: string;
    LANG: string;
    REACH: number;
    KW: IData_TagItem[];
    AU: string[];
    CNTR: string;
    CNTR_CODE: string;
    SENT: string;
    TRAFFIC: IData_TrafficItem[];
    FAV: string;
    HIGHLIGHTS: string[];
}

const NewsSnippet = ({ data }) => {
    const [showAllHighlights, setShowAllHighlights] = useState(false);
    const [showAllTags, setShowAllTags] = useState(false);
    const [byRelevance, setByRelevance] = useState(false);
    const [showAllDuplicates, setShowAllDuplicates] = useState(false);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleDateString('en-GB', { month: 'short' });
        const year = date.getFullYear();
        
        return (
            <span className="formatted-date">
            <span className="date-day">{day}</span>
            <span> {month} {year}</span>
            </span>
        );
    };

    const formatReach = (reach: number) => {
        if (reach >= 1000000) {
            return `${(reach / 1000000).toFixed(1)}M`;
        }
        if (reach >= 1000) {
            return `${(reach / 1000).toFixed(1)}K`;
        }
        return reach.toString();
    };

    const getTopTraffic = () => {
        if (!data.TRAFFIC || data.TRAFFIC.length === 0) return null;
        
        const sortedTraffic = [...data.TRAFFIC].sort((a, b) => b.count - a.count);
        return sortedTraffic.slice(0, 3).map((item, index) => (
            <span key={index} className="traffic-item">
                <span>{item.value}</span>{' '}
                <span className="traffic-percent">{Math.round(item.count * 100)}%</span>
                {index < 2 && ' '}
            </span>
        ));
    };

    const getSortedTags = () => {
        if (!data.KW || data.KW.length === 0) return null;

        const sortedTags = [...data.KW].sort((a, b) => b.count - a.count);
        return sortedTags.map((tag, index) => (
            <Tag key={index} className="tag">
                {tag.value} {tag.count}
            </Tag>
        ));
    };

    const getSortedTagsSlice = () => {
        if (!data.KW || data.KW.length === 0) return null;

        const sortedTags = [...data.KW].sort((a, b) => b.count - a.count);
        return sortedTags.slice(0, 5).map((tag, index) => (
            <Tag key={index} className="tag">
                {tag.value} {tag.count}
            </Tag>
        ));
    };

    const renderTags = () => {
        const tagsToShow = showAllTags 
        ? getSortedTags()
        : getSortedTagsSlice()
        return (
                <span>
                    {tagsToShow}
                    <button 
                        className="show-more-btn"
                        onClick={() => setShowAllTags(!showAllTags)}
                    >
                        {showAllTags ? <span>Show less</span> : <span>Show all +{data.KW.length - 5}</span>}
                </button>
                </span>
        );
    };

    const renderHighlights = () => {
        const highlightsToShow = showAllHighlights 
            ? data.HIGHLIGHTS 
            : [data.HIGHLIGHTS[0]];
        return (
            <div>
                {highlightsToShow.map((highlight, index) => (
                <p key={index}>
                    {highlightKeywords(highlight)}
                </p>
                ))}
                {data.HIGHLIGHTS.length > 1 && (
                <button 
                    className="show-more-btn"
                    onClick={() => setShowAllHighlights(!showAllHighlights)}
                >
                    {showAllHighlights ? 'Show less' : 'Show more '}
                    {showAllHighlights ? <CaretUpOutlined />: <CaretDownOutlined />}
                </button>
                )}
            </div>
        );
    };

    const highlightKeywords = (text: string) => {
        if (!text) return null;
        
        const parts = text.split(/(<kw>.*?<\/kw>)/);
        
        return parts.map((part, index) => {
          if (part.startsWith('<kw>') && part.endsWith('</kw>')) {
            const keyword = part.replace(/<\/?kw>/g, '');
            return (
              <span key={index} className="highlighted-keyword">
                {keyword}
              </span>
            );
          }
          return part;
        });
      };
    
    const getFlagEmoji = (countryCode: string) => {
        const codePoints = countryCode
          .toUpperCase()
          .split('')
          .map(char =>  127397 + char.charCodeAt(0));
        return String.fromCodePoint(...codePoints);
    };

    const getByRelevance = () =>{
        return (
            <button onClick={() => setByRelevance(!byRelevance)}>
                By Relevance
                {byRelevance ? <UpOutlined />: <DownOutlined />}
            </button>
        )
    }

    const getAllDuplicatesButton = () =>{
        return (
            <button onClick={() => setShowAllDuplicates(!showAllDuplicates)}>
                {showAllDuplicates? <UpOutlined />: <DownOutlined />}
                View Duplicates
            </button>
        )
    }

    return (
        <div className="news-snippet">
            <div className="snippet-header">
                <div className="date-reach-traffic">
                    <span className="date">
                        {formatDate(data.DP)}
                    </span>
                    <span className="reach">
                        <span className="reach-number">{formatReach(data.REACH)}</span> Reach
                    </span>
                    {data.TRAFFIC && data.TRAFFIC.length > 0 && (
                    <span className="traffic">
                        <span>Top Traffic: </span>
                        {getTopTraffic()}
                    </span>
                    )}
                </div>
                <div className="buttons">
                    <span className="positive">
                        Positive
                    </span>
                    <InfoCircleOutlined />
                    <BorderOutlined />
                </div>
            </div>

            <div className="snippet-title">
                <h3>{data.TI}</h3>
            </div>

            <div className="snippet-source">
                <div className="favicon">
                    <GlobalOutlined />
                </div>
                <span className="domain">{data.DOM}</span>
                <span className="country">
                    <span className = "country-flag">{getFlagEmoji(data.CNTR_CODE)}</span>
                    <span>{data.CNTR}</span>
                    </span>
                <span className="language"> <ReadOutlined /> {data.LANG}</span>
                {data.AU && data.AU.length > 0 && (
                    <span className="authors">
                        <TeamOutlined />
                        {data.AU.join(', ')}
                        , et al.
                    </span>
                )}
            </div>

            <div className="snippet-content">
                <p>{renderHighlights()}</p>
            </div>

            <div className="snippet-tags">
                {renderTags()}
            </div>

            <div className="snippet-original-source">
                <span className="original-source">Original Source</span>
            </div>

            <div className="snippet-footer">
                <span className="duplicates">
                    <span>Duplicates: </span>
                    <span className="num">192</span>
                </span>
                <span className="sort-by">{getByRelevance()}</span>
            </div>

            <div className="duplicate-block">
                <div className="snippet-header">
                    <div className="date-reach-traffic">
                        <span className="date">
                            {formatDate(data.DP)}
                        </span>
                        <span className="reach">
                            <span className="reach-number">{formatReach(data.REACH)}</span> Reach
                        </span>
                    </div>
                    <div className="buttons">
                        <InfoCircleOutlined />
                        <BorderOutlined />
                    </div>
                </div>

                <div className="snippet-title">
                    <h3>{data.TI}</h3>
                </div>

                <div className="snippet-source">
                    <div className="favicon">
                        <Avatar size="small" icon={<GlobalOutlined />} />
                    </div>
                    <span className="domain">{data.DOM}</span>
                    <span className="country">
                        <span className = "country-flag">{getFlagEmoji(data.CNTR_CODE)}</span>
                        <span>{data.CNTR}</span>
                        </span>
                    {data.AU && data.AU.length > 0 && (
                        <span className="authors">
                            <TeamOutlined />
                            {data.AU.join(', ')}
                            , et al.
                        </span>
                    )}
                </div>
            </div>
            <div className ="view-duplicates-btn">
                    {getAllDuplicatesButton()}
            </div>
        </div>
    );
};

export default NewsSnippet;