import React from "react"
import ForUseCasePage from "../../../components/ForUseCasePage"
import { getForUseCase } from "../../../data/forUseCases"

const Page = () => <ForUseCasePage page={getForUseCase("collectors")} />

export default Page
