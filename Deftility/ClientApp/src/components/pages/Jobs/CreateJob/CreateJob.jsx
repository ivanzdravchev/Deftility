import React, { useState, useEffect } from 'react';
import { getAllCategories } from '../../../../api/categoriesApi';
import { getAllSkills } from '../../../../api/skillsApi';
import { createJob } from '../../../../api/jobsApi';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import HourlyIcon from '../../../../images/clock-icon.png';
import FixedIcon from '../../../../images/moneylock-icon.png';
import './CreateJob.scss';

function CreateJob(props) {
  const [formState, setFormState] = useState({
    name: '',
    description: '',
    category: '',
    categoryFilterPhrase: '',
    filteredCategories: [],
    isCategorySelected: false,
    priceType: '',
    lowestRate: 0,
    highestRate: 0,
    experienceLevel: '',
    skillFilterPhrase: '',
    selectedSkills: [],
    filteredSkills: [],
    isSkillSelected: false
  });

  const [formErrorState, setFormErrorState] = useState({
    nameError: false,
    descriptionError: false,
    categoryError: false,
    priceTypeError: false,
    lowestRateError: false,
    highestRateError: false,
    experienceLevelError: false
  });

  const [categories, setCategories] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    // avoid unnecessary call to BE if not logged in since we redirect
    if (props.isAuthenticated) {
      getAllCategories().then(result => {
        setCategories(result.data);
      }).catch(err => console.error(err));
    }
    
    return () => {
      setCategories([]);
    };
  }, [props.isAuthenticated]);

  useEffect(() => {
    // avoid unnecessary call to BE if not logged in since we redirect
    if (props.isAuthenticated) {
      getAllSkills().then(result => {
        setSkills(result.data);
      }).catch(err => console.error(err));
    }

    return () => {
      setSkills([]);
    };
  }, [props.isAuthenticated]);

  function onNameChange(event) {
    setFormState({ ...formState, 'name': event.target.value});
  }

  function onDescriptionChange(event) {
    setFormState({ ...formState, 'description': event.target.value})
  }

  function onCategoryInputChange(event) {
    setFormState({ 
      ...formState,
      'category': event.target.value,
      'categoryFilterPhrase': event.target.value,
      'filteredCategories': categories.filter(c => c.name.toLowerCase().includes(event.target.value.toLowerCase())),
      'isCategorySelected': false
    });
  }

  function onCategoryListingClick(event) {
    setFormState({
      ...formState,
      'category': event.target.innerText,
      'categoryFilterPhrase': event.target.innerText,
      'isCategorySelected': true
    });
  }

  function onPriceTypeSelect(priceType) {
    return function() {
      setFormState({
        ...formState,
        priceType
      });
    }
  }

  function onPriceLowestRateChange(event) {
    const currentLowestRate = Math.floor(event.target.value);

    setFormState({
      ...formState,
      'lowestRate': currentLowestRate
    });
  }

  function onPriceHighestRateChange(event) {
    const currentHighestRate = Math.floor(event.target.value);

    setFormState({
      ...formState,
      'highestRate': currentHighestRate
    });
  }

  function onExperienceLevelChange(event) {
    setFormState({
      ...formState,
      'experienceLevel': event.target.value
    });
  }

  function onSkillInputChange(event) {
    setFormState({ 
      ...formState,
      'skillFilterPhrase': event.target.value,
      'filteredSkills': skills.filter(s => s.name.toLowerCase().includes(event.target.value.toLowerCase())),
      'isSkillSelected': false
    });
  }

  function onSkillListingClick(event) {
    if (formState.selectedSkills.includes(event.target.innerText)) {
      setFormState({
        ...formState,
        'skillFilterPhrase': '',
        'isSkillSelected': true
      });
    } else {
      setFormState({
        ...formState,
        'selectedSkills': [...formState.selectedSkills, event.target.innerText],
        'skillFilterPhrase': '',
        'isSkillSelected': true
      });
    }
  }

  function removeSkill(skillName) {
    return function() {
      setFormState({
        ...formState,
        'selectedSkills': [...formState.selectedSkills.filter(skill => skill !== skillName)]
      });
    }
  }

  function onSubmit(event) {
    event.preventDefault();

    const newFormErrorState = {
      nameError: false,
      descriptionError: false,
      categoryError: false,
      priceTypeError: false,
      lowestRateError: false,
      highestRateError: false,
      experienceLevelError: false
    };

    if (formState.name.length < 10) {
      newFormErrorState.nameError = true;
    }

    if (formState.description.length < 20) {
      newFormErrorState.descriptionError = true;
    }

    if (categories.filter(c => c.name.toLowerCase() === formState.category.toLowerCase()).length === 0) {
      newFormErrorState.categoryError = true;
    }

    if (formState.priceType !== 'Hourly' && formState.priceType !== 'Fixed') {
      newFormErrorState.priceTypeError = true;
    }

    if (formState.lowestRate < 1 || formState.lowestRate > 1000000) {
      newFormErrorState.lowestRateError = true;
    }

    if (formState.highestRate < 1 || formState.highestRate > 1000000) {
      newFormErrorState.highestRateError = true;
    }

    if (formState.experienceLevel !== 'Beginner' && formState.experienceLevel !== 'Intermediate' && formState.experienceLevel !== 'Expert') {
      newFormErrorState.experienceLevelError = true;
    }

    setFormErrorState(newFormErrorState);

    // if there's at least 1 error
    if (Object.keys(newFormErrorState).some(key => newFormErrorState[key])) {
      return;
    }

    const apiCallJson = {
      title: formState.name,
      description: formState.description,
      categoryId: categories.find(c => c.name === formState.category).id,
      priceType: formState.priceType,
      lowestRate: formState.lowestRate,
      highestRate: formState.highestRate,
      experienceLevel: formState.experienceLevel,
      skills: formState.selectedSkills.map(ss => skills.find(s => s.name === ss).id)
    };

    createJob(apiCallJson).then((response) => {
      props.history.push('/jobs');
      toast.info(response.data.message);
    }).catch(err => {
      console.log({...err});
      if (err.response.data.error) {
        toast.error(err.response.data.error);
      } else if (err.response.data.errors) {
        toast.error('One or more validation errors occurred');
      }
    });
  }

  return (
    <>
      {!props.isAuthenticated && <Redirect to="/" />}
      <div className="create-job-header-wrapper">
        <div className="create-job-header">
          <h1>Tell us what you need done</h1>
          <p>Contact some of our most skilled freelancers within minutes, view their profiles, ratings and start chats with them. Pay the freelancer when you are 100% satisfied with their work.</p>
        </div>
      </div>
      <div className="create-job-form-wrapper">
        <form onSubmit={onSubmit}>
          <div className="input-label-group">
            <h3>Choose a name for your project</h3>
            <input 
              type="text"
              name="project-name"
              placeholder="e.g. Create website design"
              autoComplete="off"
              onChange={onNameChange} />
            <p className={formErrorState.nameError ? "input-error" : "input-error hidden"}>Project name must be at least 10 characters long.</p>
          </div>
          <div className="input-label-group">
            <h3>Tell us more about your project</h3>
            <p>Share a bit about yourself or your business, and include an overview of what you need done.</p>
            <textarea
              placeholder="Describe your project here..."
              onChange={onDescriptionChange} />
            <p className={formErrorState.descriptionError ? "input-error" : "input-error hidden"}>Project description must be at least 20 characters long.</p>
          </div>
          <div className="input-label-group">
            <h3>What category does your project belong in?</h3>
            <input 
              type="text"
              name="category"
              placeholder="e.g. Website Freelancing"
              autoComplete="off"
              value={formState.categoryFilterPhrase}
              onChange={onCategoryInputChange} />
            <div className={formState.categoryFilterPhrase.length > 0 && !formState.isCategorySelected ? "categories-list-wrapper" : "categories-list-wrapper hidden"}>
              <ul>
                {formState.filteredCategories.map((category, index) => (
                  <li key={category.name} onClick={onCategoryListingClick}>{category.name}</li>
                ))}
              </ul>
            </div>
            <p className={formErrorState.categoryError ? "input-error" : "input-error hidden"}>Please select a valid category from the list.</p>
          </div>
          <div className="input-label-group">
            <h3>How do you want to pay?</h3>
            <div className="payment-types-wrapper">
              <div className={formState.priceType === 'Hourly' ? "payment-type-card payment-card-selected" : "payment-type-card"} onClick={onPriceTypeSelect('Hourly')}>
                <img src={HourlyIcon} alt="hourly" />
                <div className="payment-card-text">
                  <h4>Pay by the hour</h4>
                  <p>Hire based on an hourly rate and pay for hours billed. Best for ongoing work.</p>
                </div>
              </div>
              <div className={formState.priceType === 'Fixed' ? "payment-type-card payment-card-selected" : "payment-type-card"} onClick={onPriceTypeSelect('Fixed')}>
                <img src={FixedIcon} alt="fixed price" />
                <div className="payment-card-text">
                  <h4>Fixed price</h4>
                  <p>Hire based on an hourly rate and pay for hours billed. Best for ongoing work.</p>
                </div>
              </div>
            </div>
            <p className={formErrorState.priceTypeError ? "input-error" : "input-error hidden"}>Please select a payment option.</p>
          </div>
          <div className="input-label-group">
            <div className="price-level-wrapper">
              <div className="price-section">
                <h3>How much are you willing to pay?</h3>
                <input
                  type="number"
                  name="lowestRate"
                  placeholder="Lowest rate"
                  onChange={onPriceLowestRateChange} />
                
                <input
                  type="number"
                  name="highestRate"
                  placeholder="Highest rate"
                  onChange={onPriceHighestRateChange} />
                <p className={formErrorState.lowestRateError || formErrorState.highestRateError ? "input-error" : "input-error hidden"}>Invalid rates.</p>
              </div>
              <div className="level-section">
                <h3>What level of expertise do you need?</h3>
                <select defaultValue="" onChange={onExperienceLevelChange}>
                  <option value="" disabled></option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Expert">Expert</option>
                </select>
                <p className={formErrorState.experienceLevelError ? "input-error" : "input-error hidden"}>Please select what experience level are you looking for.</p>
              </div>
            </div>
          </div>
          <div className="input-label-group">
            <h3>What skills are needed for the project?</h3>
            <input 
              type="text"
              name="skills"
              placeholder="Type to add skills"
              value={formState.skillFilterPhrase}
              onChange={onSkillInputChange} />
            <div className={formState.skillFilterPhrase.length > 0 && !formState.isSkillSelected ? "skills-list-wrapper" : "skills-list-wrapper hidden"}>
              <ul>
                {formState.filteredSkills.map((skill, index) => (
                  <li key={skill.name} onClick={onSkillListingClick}>{skill.name}</li>
                ))}
              </ul>
            </div>
            <div className="selected-skills-list">
              {formState.selectedSkills.map((skill, index) => (
                <span className="selected-skill-listing" key={skill + index}>
                  {skill}
                  <svg onClick={removeSkill(skill)} xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
                </span>
              ))}
            </div>
          </div>
          <button type="submit">Create Project</button>
        </form>
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.userReducer.token ? true : false
  };
}

export default connect(mapStateToProps)(CreateJob);
