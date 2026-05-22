import React from "react"
import ForUseCasePage from "../../../components/ForUseCasePage"
import { getForUseCase } from "../../../data/forUseCases"

const Page = () => <ForUseCasePage page={getForUseCase("home-insurance")} />

export default Page
