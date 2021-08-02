import React, { useState, useEffect } from 'react';
import { getAllJobs } from '../../../../api/jobsApi';
import { getAllCategories } from '../../../../api/categoriesApi';
import JobListing from '../../../jobs/JobListing/JobListing';
import Loader from 'react-loader-spinner';

import './JobList.scss';

export default function JobList() {
  const [filters, setFilters] = useState({
    searchPhrase: '',
    categoryFilterPhrase: '',
    filteredCategories: [],
    showCategoryDropdown: false,
    experienceLevel: 'Any',
    priceType: 'Any',
    lowestBudget: 0,
    highestBudget: 0
  });

  const [jobsAreFetched, setJobsAreFetched] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllJobs().then(result => {
      setJobs(result.data);
      setFilteredJobs(result.data);
      setJobsAreFetched(true);
    }).catch(err => console.error(err));
    
    return () => {
      setJobs([]);
      setFilteredJobs([]);
    };
  }, []);

  useEffect(() => {
    getAllCategories().then(result => {
      setCategories(result.data);
    }).catch(err => console.error(err));
    
    return () => {
      setCategories([]);
    };
  }, []);

  function onSearchChange(event) {
    setFilters({ 
      ...filters,
      'searchPhrase': event.target.value
    });
  }

  function onFilterCategoryChange(event) {
    setFilters({ 
      ...filters,
      'categoryFilterPhrase': event.target.value,
      'filteredCategories': categories.filter(c => c.name.toLowerCase().includes(event.target.value.toLowerCase())),
      'showCategoryDropdown': true
    });
  }

  function onFilterCategoryFocus(event) {
    if (filters.categoryFilterPhrase.length > 0) {
      setFilters({ 
        ...filters,
        'showCategoryDropdown': true
      });
    }
  }

  function onFilterCategoryBlur(event) {
    setFilters({ 
      ...filters,
      'showCategoryDropdown': false
    });
  }

  function onCategoryListingClick(event) {
    setFilters({
      ...filters,
      'categoryFilterPhrase': event.target.innerText,
      'filteredCategories': categories.filter(c => c.name.toLowerCase() === event.target.innerText.toLowerCase()),
      'showCategoryDropdown': false
    });
  }

  function onExperienceFilterChange(event) {
    setFilters({
      ...filters,
      'experienceLevel': event.target.value
    });
  }

  function onPriceTypeFilterChange(event) {
    setFilters({
      ...filters,
      'priceType': event.target.value
    });
  }

  function onLowestBudgetFilterChange(event) {
    const currentLowestBudget = Math.floor(event.target.value);

    setFilters({
      ...filters,
      'lowestBudget': currentLowestBudget
    });
  }

  function onHighestBudgetFilterChange(event) {
    const currentHighestBudget = Math.floor(event.target.value);

    setFilters({
      ...filters,
      'highestBudget': currentHighestBudget
    });
  }

  function filterJobs() {
    let tempJobArray = [...jobs];

    if (filters.filteredCategories.length === 1) {
      tempJobArray = tempJobArray.filter(j => j.category.name === filters.categoryFilterPhrase);
    }

    if (filters.experienceLevel !== 'Any') {
      tempJobArray = tempJobArray.filter(j => j.experienceLevel === filters.experienceLevel);
    }

    if (filters.priceType !== 'Any') {
      tempJobArray = tempJobArray.filter(j => j.priceType === filters.priceType);
    }

    if (filters.lowestBudget > 0) {
      tempJobArray = tempJobArray.filter(j => j.lowestRate >= filters.lowestBudget);
    }

    if (filters.highestBudget > 0) {
      tempJobArray = tempJobArray.filter(j => j.highestRate <= filters.highestBudget);
    }

    setFilteredJobs(tempJobArray);
  }

  function keywordSearchJobs() {
    const filteredJobs = jobs.filter(j => 
      j.title.toLowerCase().includes(filters.searchPhrase.toLowerCase()) ||
      j.description.toLowerCase().includes(filters.searchPhrase.toLowerCase()));

    setFilteredJobs(filteredJobs);
  }

  return (
    <>
    {
      jobsAreFetched ?
      <div className="job-list-container">
        <div className="job-keyword-search">
          <span className="icon-search-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M21.71 20.29l-5.4-5.39a8 8 0 0 0-12-10.56 8 8 0 0 0 10.56 12l5.39 5.39 1.41-1.41zM10 16a6 6 0 1 1 4.24-1.76A6 6 0 0 1 10 16z"></path>
            </svg>
            <input
              type="text"
              name="keyword-search"
              placeholder="Search for keywords..."
              onChange={onSearchChange} />
          </span>
          <button className="search-btn" onClick={keywordSearchJobs}>Search</button>
        </div>
        <div className="job-list">
          <div className="job-filters">
            <h3>Filter by:</h3>
            <div className="filter-section">
              <p>Category</p>
              <input 
                type="text"
                name="filter-category"
                placeholder="Enter Category"
                value={filters.categoryFilterPhrase}
                onChange={onFilterCategoryChange}
                onFocus={onFilterCategoryFocus}
                onBlur={onFilterCategoryBlur} />
              <div className={filters.categoryFilterPhrase.length > 0 && filters.showCategoryDropdown ? "filter-categories-list-wrapper" : "filter-categories-list-wrapper hidden"}>
                <ul>
                  {filters.filteredCategories.map((category, index) => (
                    <li key={category.name} onMouseDown={onCategoryListingClick}>{category.name}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="filter-section">
              <p>Experience</p>
              <select defaultValue="Any" onChange={onExperienceFilterChange}>
                <option value="Any">Any</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
            <div className="filter-section">
              <p>Price type</p>
              <select defaultValue="Any" onChange={onPriceTypeFilterChange}>
                <option value="Any">Any</option>
                <option value="Fixed">Fixed</option>
                <option value="Hourly">Hourly</option>
              </select>
            </div>
            <div className="filter-section">
              <p>Budget</p>
              <input
                className="money-input"
                type="number"
                name="lowest-budget"
                placeholder="Min"
                onChange={onLowestBudgetFilterChange} />

              <input
                className="money-input"
                type="number"
                name="highest-budget"
                placeholder="Max"
                onChange={onHighestBudgetFilterChange} />
            </div>
            <button className="filter-btn" onClick={filterJobs}>Filter</button>
          </div>
          <div className="job-listings">
            {filteredJobs.map((job, index) => (
              <JobListing job={job} key={job.id} />
            ))}
          </div>
        </div>
      </div>
      : <Loader className="loader" type="Oval" color="#000" height={100} width={100} />
    }
    </>
  );
}
