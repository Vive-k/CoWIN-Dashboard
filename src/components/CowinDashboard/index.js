// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import {
  PageContainer,
  LogoContainer,
  Image,
  Title,
  FailLoadContainer,
  FailImage,
} from './styledComponents'

const dataFetchedStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class CowinDashboard extends Component {
  state = {
    fetchDataResponse: dataFetchedStatusConstants.initial,
    vaccinationData: {},
  }

  componentDidMount() {
    this.getDataOfVaccination()
  }

  getDataOfVaccination = async () => {
    this.setState({fetchDataResponse: dataFetchedStatusConstants.loading})

    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(vaccinationDataApiUrl)

    if (response.ok === true) {
      const data = await response.json()

      const updatedData = {
        last7DaysVaccination: data.last_7_days_vaccination.map(each => ({
          vaccineDate: each.vaccine_date,
          dose1: each.dose_1,
          dose2: each.dose_2,
        })),
        vaccinationByAge: data.vaccination_by_age.map(range => ({
          age: range.age,
          count: range.count,
        })),
        vaccinationByGender: data.vaccination_by_gender.map(genderType => ({
          gender: genderType.gender,
          count: genderType.count,
        })),
      }

      this.setState({
        vaccinationData: updatedData,
      })

      this.setState({fetchDataResponse: dataFetchedStatusConstants.success})
    }
    if (response.ok === false) {
      this.setState({fetchDataResponse: dataFetchedStatusConstants.failure})
    }
  }

  onSuccess = () => {
    const {vaccinationData} = this.state

    console.log(vaccinationData)
    return (
      <>
        <VaccinationCoverage data={vaccinationData.last7DaysVaccination} />

        <VaccinationByGender data={vaccinationData.vaccinationByGender} />

        <VaccinationByAge data={vaccinationData.vaccinationByAge} />
      </>
    )
  }

  onFailure = () => (
    <FailLoadContainer>
      <FailImage
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png "
        alt="failure view"
      />
      <Title>Something went wrong</Title>
    </FailLoadContainer>
  )

  onLoading = () => (
    <FailLoadContainer data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </FailLoadContainer>
  )

  renderingTheResult = () => {
    const {fetchDataResponse} = this.state
    switch (fetchDataResponse) {
      case dataFetchedStatusConstants.success:
        return this.onSuccess()
      case dataFetchedStatusConstants.failure:
        return this.onFailure()
      case dataFetchedStatusConstants.loading:
        return this.onLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <PageContainer>
        <LogoContainer>
          <Image
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
          />
          <h1>Co-WIN</h1>
        </LogoContainer>
        <Title>CoWIN Vaccination in India</Title>
        {this.renderingTheResult()}
      </PageContainer>
    )
  }
}

export default CowinDashboard
