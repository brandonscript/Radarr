import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import FormGroup from 'Components/Form/FormGroup';
import FormInputGroup from 'Components/Form/FormInputGroup';
import FormLabel from 'Components/Form/FormLabel';
import { inputTypes } from 'Helpers/Props';

function getType({ type, selectOptionsProviderAction }) {
  switch (type) {
    case 'captcha':
      return inputTypes.CAPTCHA;
    case 'checkbox':
      return inputTypes.CHECK;
    case 'device':
      return inputTypes.DEVICE;
    case 'keyValueList':
      return inputTypes.KEY_VALUE_LIST;
    case 'password':
      return inputTypes.PASSWORD;
    case 'number':
      return inputTypes.NUMBER;
    case 'path':
      return inputTypes.PATH;
    case 'filePath':
      return inputTypes.PATH;
    case 'select':
      if (selectOptionsProviderAction) {
        return inputTypes.DYNAMIC_SELECT;
      }
      return inputTypes.SELECT;
    case 'movieTag':
      return inputTypes.MOVIE_TAG;
    case 'tag':
      return inputTypes.TEXT_TAG;
    case 'tagSelect':
      return inputTypes.TAG_SELECT;
    case 'textbox':
      return inputTypes.TEXT;
    case 'oAuth':
      return inputTypes.OAUTH;
    case 'rootFolder':
      return inputTypes.ROOT_FOLDER_SELECT;
    case 'qualityProfile':
      return inputTypes.QUALITY_PROFILE_SELECT;
    default:
      return inputTypes.TEXT;
  }
}

function getSelectValues(selectOptions) {
  if (!selectOptions) {
    return;
  }

  return _.reduce(selectOptions, (result, option) => {
    result.push({
      key: option.value,
      value: option.name,
      dividerAfter: option.dividerAfter,
      hint: option.hint
    });

    return result;
  }, []);
}

function ProviderFieldFormGroup(props) {
  const {
    advancedSettings,
    name,
    label,
    helpText,
    helpTextWarning,
    helpLink,
    placeholder,
    value,
    type,
    advanced,
    hidden,
    pending,
    errors,
    warnings,
    selectOptions,
    onChange,
    ...otherProps
  } = props;

  if (
    hidden === 'hidden' ||
    (hidden === 'hiddenIfNotSet' && !value)
  ) {
    return null;
  }

  return (
    <FormGroup
      advancedSettings={advancedSettings}
      isAdvanced={advanced}
    >
      <FormLabel>{label}</FormLabel>

      <FormInputGroup
        type={getType(props)}
        name={name}
        label={label}
        helpText={helpText}
        helpTextWarning={helpTextWarning}
        helpLink={helpLink}
        placeholder={placeholder}
        value={value}
        values={getSelectValues(selectOptions)}
        errors={errors}
        warnings={warnings}
        pending={pending}
        includeFiles={type === 'filePath' ? true : undefined}
        onChange={onChange}
        {...otherProps}
      />
    </FormGroup>
  );
}

const selectOptionsShape = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  hint: PropTypes.string
};

ProviderFieldFormGroup.propTypes = {
  advancedSettings: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  helpText: PropTypes.string,
  helpTextWarning: PropTypes.string,
  helpLink: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  type: PropTypes.string.isRequired,
  advanced: PropTypes.bool.isRequired,
  hidden: PropTypes.string,
  isDisabled: PropTypes.bool,
  provider: PropTypes.string,
  pending: PropTypes.bool.isRequired,
  errors: PropTypes.arrayOf(PropTypes.object).isRequired,
  warnings: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectOptions: PropTypes.arrayOf(PropTypes.shape(selectOptionsShape)),
  selectOptionsProviderAction: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

ProviderFieldFormGroup.defaultProps = {
  advancedSettings: false
};

export default ProviderFieldFormGroup;
