import { useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { MapPin, Users, Building, Star, Briefcase } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useJobs } from '@/hooks/useJobs';
import { Link } from 'react-router-dom';

interface CompanyInfo {
  name: string;
  jobCount: number;
  disabilitySupport: string[];
  location: string;
  latestJobs: {
    id: string;
    title: string;
    type: string;
  }[];
}

export default function Company() {
  const { jobs, loading } = useJobs();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  // Mengorganisir data jobs berdasarkan perusahaan
  const companyData = jobs.reduce<Record<string, CompanyInfo>>((acc, job) => {
    if (!acc[job.company]) {
      acc[job.company] = {
        name: job.company,
        jobCount: 0,
        disabilitySupport: [],
        location: job.location,
        latestJobs: []
      };
    }

    acc[job.company].jobCount += 1;
    acc[job.company].disabilitySupport = [
      ...new Set([...acc[job.company].disabilitySupport, ...job.disability_support])
    ];
    acc[job.company].latestJobs.push({
      id: job.id,
      title: job.title,
      type: job.type
    });

    return acc;
  }, {});

  // Data tambahan untuk setiap perusahaan (dummy data)
  const companyExtraInfo = {
    'Mantap Mart': {
      logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABO1BMVEX///+a3QH//v////2X3QCZ3AH///v//v2W2wD//f////r///f8///cAAD9//0Amdyz5E0Al90Amtyh3Bj9/+z1///c9Knv+9Gi2CXUAAAAlNis3j/a86QAl9/ZTEv8//Pi9bG/6WcAldTv///2qafmZ2kAkt3XAAD9/+/3/+VFrt0Aj9Tk/P8AnNrQ8f2t4fXE6Hj2/9234VXm+cDt+8fK7YF6x+dzwOYmnNXK7/yg2PFErN6R0e4Aksus4PT/6+rO7Y697GTB6GvK7H7X85i03V/f87Wv4Da73mSz5Uih3yl1yvFXuuiI1OtrwOM7ptQ/tOmt6/9lyvVTq9XP+v92vOkyr+y68f84ps6h2uvulZr+3dnSPj7jc3XrhILYJSv8x8nytLHbLTD2p6njHR/rfoHkb2zujo7mqaifGwj8AAAd2klEQVR4nO1dDVsaSbYuq7qruptOI7St2Mpgmo0RaUD8QBA0jjFxd4bgzpq7s05mZpPd2bnz/3/BfU+BRhMFFNBkL+dxkgwq1Fvn6z2nPpqxqUxlKlOZylSmMpWpTGUqU5nKVKYylalMZSpfrggmFf5SknMpGOMMf3LGPwp90/M8LoSnFOMSLwj12KO+gyjBMVzpeFIoRwlgYHYil8hdE2kLgio95jjKxr84JuZrEcWEJwic9KStVGJha2v+1dIn8nJra6vAHM4Vl66ECrVmvxIBQqjEU7Zk1YWdp5u+ZVmm8YmYePHk21cr1QKTzIMq6Ze+FlFMG1xha+fI9y3DmgGemRnTxNdHmSGYQG4tbRxXE+zrQUcj9Th3cq8Pl6AmgjEDMbt/XcrH/yWc/tFx1RHKe+zBDxBJX0pIBMZE9XAJyjNmzJnBQtq0LH9zZS2BmIvZQWT6IgMrhoXgiAzA11ZeZYaF19Mv+aU/u7OA9MI8BF/1JRotTT3lhdzrTUvboKm1MwxCs2utpunvVHvh5gtMHEogIHIOfD5pzzSHwfaZJi1g5LaiRPrYgD4XqZSdWNmkkNLV3J0gGhf/Wf7LBWJDX5wSPeVytTBr6rxAHjiUfV7TYfcP0uNhQtmCcs6Xo0iEBltUDzNIfaMLMG6u5GzYhPhSIErhSp7byvQy+cgILUqQVZAi/qVkDaQItvZnhJYxwCMhVzYzK8xGwJGPDa4rSm0fUezsOuF4xPCPC9Ch+CIiDmcrRGDGpMFLiNZmATnoke1U6VBQ2PA1+xwvQkBcmqcSWj1i5UjFrWKFzTFDuxTLPwbL9QQXj8TJYUJCulWQNHPsCuwKnDGhUGgq53EQAqAtlzPm3RnM8BDNzSpTtnocZ6Qg4C2bvSw/IYRwxqrL7ccBCC+Uy/5FCJ2MlYLAA+LjxFMlUQEs35elXbDWYTRPED1UjQ+NUHDHXb634syh8dEPLxWQMx6c3XDJq5n7O99lC2DwW8BQd+SjlFOFTWt05xviHUBT/WPKvQ+MjwPg/QMoMVjfpEbAYIjUeDSPEw+oQ0pOHlMb1ggJwvCfvq4uf+sPy2YNf8FWD1YtgidyJlf8+xYSVIT4h2vMZonlzJCGbpqbBf5wWsRU8m3//hYKTn2Us5FubLE85DyZpvUqwR6KnYLJ8LmjkWzU3BKSS+GotaNhay7DXKFm18NAlF5CO+H9tehXtSvjvbb8YX/H8F/biQeibw57TSHi3hgNQkhLo4gdhaWhf83aXHuATjhVasJGqr9zs/AaRL8ATiSo/pIvhyd+1gat+0y24a9dXdqH5mgVvZEhhBSwJFsZvvlhZKp6uXyizigkVLiduXPL/ooAkJVB6NcDdVh1WEecISXmbOZOFKGCbYnE7ChRRo/0pMAVBopgwwsnQ+vQNPx5JpzJLhUrJthrc6TONnG1kwIjhOAOam5peCs1rM055NGJpkV4wdrmaGGGsvdSV4fUTHa+HXK+DLIbc57Zk0WoSIWjNUY1j+51lqheeHoXizA25zxvkn6Iec/Njrr6Ypk7axdv6IrC8FZKYi6ziVaKnsNXRomjNERj5mXuskrw7lpGG7Nz9iStVPLc5mhOCBPdyF3g44TwDtlC//o8m2DzVCl7ZVQbNTfWuCcv35DP38mrUTFDiRNEKOTmSCWF7vDaH3tKnroLa+u+ifVa58MJhRs+IiM1rKVthzmXoxN8bvaOgdkwXsoJIpSHo5SFpmGcbHHahXA5PL5yRzckYrNASWtCsrY0kgZR4jHHkd3Np4z04GzcVYWwg+VJbbfBxG2Zo6zyUlPQlkLIC0eUbOHkjjNGexpnE5OxUYQZcWwZI6RD82hOEW2+aJqBnRzfecoMqi4n0x9Wwl777t5VIcKoNVvgztWRKbU2+wlA2qE58L2sw0s7H6dIicJwmM+/RQwjs+JdXZZXSqgt35jp7qe9y1tZmwkyqHEjRJBnd81d1wD6x47tXOnNC6lyR9a9/NpfmMQeDSRn72gUhJsFm18dF9S5nbncn3J1s9FAlmNt2ZPYnylZ9f5dYISH+c/Cg3NoGrQDnIS2Q9MX/d9Mb2vc7W+24UxirS3Bt++Wna+Jierc8cSV/fgo8BeOnn4u3/p6P3jf6XqakOOvEpV0DkcwUn9F8es6hJVyifglrwkIwdamafW3VN1RHrcgTzuv7m+kyBQ2E58gvC1YFGbNAUtS1vYElmmUndi8rw4xYDCtT1filfpsGYJekpIjAvUPNtbKJBDyhRGWmzJVdssOtZteTQwos03jVWLsoRTj2LrvojbiBnL0zUMStLHqQrpgkTOPB3BDYyk39vJCeXy7v5HqtZob58AgIx16BZd2Bg9qyRqziQmkC3t+oA4/ta2LTTOGv82GrlkF89h8f4CmtTQ3/nNgbuLVgI+FBq2rB5tM37S6jNM8KXA27MkmoWRiAHkyabl03KJ4bqlvgDPxsScbK9vX5PhEb943nyIwDEuzhMOrJ1b/bGFSFTx2hIml/vENefj19TOENueocJHarJeOPlIzHEK3sDGohiGE46+fEv07GLDK2TmuRO8MLA0VmS2he/bWss2GXoIX3S3Hfe1lZgI6ZNDhoHmdveEU4TJtKzK3hwulSp+tpU3xj4GQDUJo3IhwXiNcGD5ZSLnjD9o0/oUhRATy74BQOblDf0BxMTmE/Uua8SBk0s5tDKiBv3KEQkfgrwrhzN0QEkV/2Z8+fXEIrbshRESd739AUyMcf5/mwRAyLnf6b1392hEKnhiwGeJrR6j0lqT/YoS9w7YPj9Bz7pvx74LQEyp3CLbef5nSmBQvHVB3jwOh8NiKr08q9O0mzkyitqD6cPIIuacP+5n9F90sYzLV08YDIESBL6u0tD/gs/zt8S8DK/Z6gHOMRYdKSXY4aBXWNJdyY9+DKTnbnjxCgRJaDD4HAIQTOGAi1YB+6XiyBfc8u5AZtGJK/dJxAxRMDNiBNhaESkjPpjWu/hCtjQmskHJbPp08Qlq5YLRpZwDCrQmsWwgv8ee+CXE8OmS2WhiQlnQo9cZ/lA1hvP+J0fFwGpbbGrwPzFgqjH9XlPKkvdD3THNfhHxoXrrSvb2gv0O8ctT414A9qQon99YhV0NlaDjhQmbw9UTWIS2Yjxkg6ZBt9Ivi40BIrbZDc+BRB3/b/nx1dQwQPXFo9YE4FoSC036IQdkwU+XO+FdIQafsQr/pvR2h3i85DEJ8hhBzfxm0w9M6Yo439s3eQqGwSfS74+NWhObMsDoUUgleGIDQNM152q8//tqC3vG4z4ebBhB+JvMGLSQucEn54uN69o3vTlvLJBhNv2mcMUzDn7O9Se1m77dZ4SaESlvpjD6mPMSke0i6cqdfs4QWNKyjBJOTun+g3yaJ2xEa1jGKnSGsVEqRm/cHdoNXEHEndm5m2b+NMpoztyCk7d2Zw8LcELKwfHzk99+5Z8yYS3NscldI2Gu3rijcipDOqhl+Zhjx6SLXfgqkz7GOOVPDL7jeVfjRbWZ6A0IahI6ln14/e6NY3Rswh2DdtNd/UpdIgJveFmvMGfMThJz2Jhxb+sDhpzIARh+AxqtJnuwCr3FuuyzCNKy/zPUutGZ6bwmR7dxFTfmJa5k3yRAAkSq2J3oon0tqotw8FMP0j+euZnwgdbYzw1/UOszhacM4Skxk9+yFKFckjm4hp7BFf3N55aocbw7suNxFyNz9LXuiRyxheuSJN46a7nSiTc1XxRiwbeTOYjxNKHuSViodR8hbOsNdX9Lou8HEGNtVkT102gvtyd6nJOguyls98UbY4wNICKHCB7hsSG6McLnQCAh1LiQKP8nz+ILUaBdmRzn9NAJGWlNTE+iyXReFWVwe5RTi/QEaJwX44IRv3xeK9uat9Tkra4CmjXgH2C3k3rDmmUc3f0z8NiUYSdXvXml9dSRGd8Pdyc7rreOn5pXjPrT/UkfZ3o0odBq4ezBGPz9AI7pgPnQ1e+bkO5olo7vU3eN4VINt0IX2DyKC0f1ORFauIdR7d1/OUdbMHV90Pbuwjd4t7RcMVZd51mfUgYqQne3CXHX7eGPJty7vdDf1t5YW7Ie6C0uCvX3edqP/tTbWuBvHge3sWN1XDLJaqp26W6KhmczmxiZdG+2fnGQ+7pO+sINjr0s7nbmVk6sH20x9n9lEL4y4Ipx5rPrZvgUaKEYR1Or13TyYj75JyvSXNpa3tquF6vbK4SwUmzmuJmSiergxv0C6Wj7KWBfXsc/oi5LsuLLXiPN0nVjG+Hg60TAPpRKTOFh5kyhK/NWTTwmZSTvW1UGYSoZ7sNNNKCizs7B22dkUaysn/jwoQ8Bsp1do8cTCS/9yW4JhHatgNwrD+nqt7Lja1KHzpye+Ze4kwNYmfDfNpYA3oQilM8HmTG/XhC5+TGN2ju2tptNhzeM8t7X07QLNeRCXG5VGOUai2drI8bi124oVy5creDEQzJvPXKz4GOYWi+upVCqbKtZj2IE5A53nEoWtnT9XPfmQN7STFp1Dvxcqe8cj8c/NNVYJ08mw7VLIrea4iiud03o6CpOlervMvIJw28VssZM/aEbRalQ/3ctzNX9xzMn0q6xRSiWTqXRydY/N/cXyt+g+FUXFpvegV3sDoWPLQ7rTTD9gxPwuk/nONL7bVjKuJ5PZ+vfts4bjcW+vXsymskkt2XpDSJ6vZ1Ppv7ejbJa+kw3Xy5JdHAIylnLsHFaeTCdTqzUhvrWOGXT+fSV2pSPdB73fE05vq9wsxQDL3zxcqc7NLbzeWOZe+Q1GlyylUqtnruO2wmwqGUX1ZjPCP8J2oFQeOsqmU1G9U2vXs+l0qhnzQm9N1HrqsFYxm07WgbLjqqOjNRafhtB1pxJI76GfW6KUt42Abm2uzOlyxrYTOYXxpDC6ZBhF50KWS9lk2KzE+XzQwKBTpVg5+XoSPxG9iV03aKxDW8Way3pnN60dGbSzqVTUDmk65PwCdzurqSiZDaNO4Dz0xeVCCL5wtEmdCzduIGzkkSbL4WoIJ0q1DxBEVBlhcT2WCSHct3/NJrNRrGQekSSZqrkK/E++Jbj1mG91/dB6zWDEyVT9DUA182rOEwcheWU6nQ0b+kk9DyG9U9TKdVHwO2uSu41OM4Q0D1zPrdS+T2I4NeU4nuMedHZjAfyts1KYTqXCMmIoIYzKIrdztKVYDSqPGnRpm855CyyOUuns2Q8RAVeeXa4jriK2ZtP18oPF0svHh7lS0g0CcSfSlpnK7lfwCiuTXjou296ZcyULyq3dephdDfFiOmw4AlYKJcUCdfSmZHtFwL1AaGUKrBJlkWwapXS6FAsRtMNsOvo7WcVZ8CD3stOykefpv5Sw3R9ru+V4fXU1G+2vpkrp1GkeMT1/Ci0082w5UxVeZR3KTYWn7fPvV4Gw4pAfJpNwyOqJ9VIiriC3NJS+SgkunWAtIgznmKV0MWbsDSYg3f5rWCpl95inuOdN+n5Pj67r8BRdzClc2YjCYrOTDf8BmtWKsknoSCjPXUeorMds4Vix833KB61yPpDnSA5hg5EfAtSeUIVqQuWb8E787HYX4QZjndUkzDZGlMWblevwx/oPJWi9VAbJcFE8PUBWFEIfUeZKHawmkdKiTux4yq1FqVKqRdsna8j5UZnlClLzk3YM20WMJCZQAcJmiqJLQyquAsomYScAP+pyNpZfz5ZS9Xz+NJsuVoKzsJQKD5Ah06vtQOhnJFLDe1Jq7AYYOmQX5PMujFXAWzC763kpnIRqIESsdkjLlWIyGR2gUnbKyILh9whKLP8G/0yHuy4LmkQAwlKtETc6EfQeNWROV9Q9zlZKrbvuKaz0fC9KJovtfCfMlsJzZrtuV39j6tNQ7iGCjZSAf2GMClQTId6NK7V2c70VOy6pA07T8phcm6MIkqII7xHWFLC4+XyZTDdqVSqtZjGJV5OIj4Qw1TzNwj8jeilqufy1vqzB8Kuigd8o1phLCfFvSBz4DQq+qX2wWseND/Za8AgMxpW0bu6NsG+IHFqB63IqyWjqBFdcOEgMdXDMVLh6lpdKwR5TGI++OjnoQJ/7ZfxSXE8ns6XdTn3/TQ2RIrUahavF+l5lPxvVYydoQte1RrNI/BrMYC+wC5uavdN9kXv7eMcD5u4i4CC9wEZBdEGC2oHnikadZiWq7zYCJCrpeWK0hgZ3bZsuCXAcl7zOw9fbdrQKDaQQOMOagJkCbHbdpYuDhNgrZsnRwB870FwaRolpaNXDYjEsNVtIi43dWkMJ6BAIWbzXbp42z1Bl2HMb+hC4YR05qkbMpyzcGmUXmDWyTo0mYs+xQW9oUpCXiuH6AdzSdh3mjoCPApcMGrVaWer9s24iaNVXU8Ww3q7DuhAtkRhgptl6mSzZIwNDJmOe6zSQO0ht66AhcQNSDvB9mxakEHLwO6ka5g1VVd5lNq8e+TO61LV2uDpbpTiskDSgwhJFUO0K9bLDbXEQ4dOb9OnZ1bOyGJHFkZUGDZQAxfW8AqvnMqghWES7lTx7e4oJLh4grtUw2uK5XkcTKCpSyTOGieGN3bN27bwR0LP+6DEYIOrV5ZWCkysU7KAJvcPT6I5OxXLV4yVTd3Ogw6dIhyipduEje/BHfNqe8sqIW+G6y6WQXuPNeQyGhBo5HdYrLvxmhLAqmIw7yGYIixUkOXxAK8KsVlCy5ltpojAdlzIirGpXF4MwInDSjiu3q7Z0A5dqHWfrmKqOwvbxRsYyTzaOlubJD5OwUmd5Z3l+/vBp5mNXjm4Xzp//D5XH3TcO23lHtCjL7HmeQyEcSkeychvr+C5sB7aF/OjSJYV3hkoWultMajZGAVJSbkuHB5Qj1omllZL7seLI2Ok0Mra+9Lh8drpbtuc2l17PIQMmctWVDd/0v+uuz+s+lWUdi2Ad7rqn5mb12f0r6/amYR7lMDnQuifz+PBV2GY3ucAzveBgvV6vt1uVckB5Crygpm8L47bkcIC7r2ZwXcrC2VPp6ECAMZVh/s1AxbDVsNOmeIqX3dqqZs4UeFEYxaj/nOOMtXR0eHi0RI00s/soxF6Bi2Ai3dZ+dFrm1e90P/QSn/639bSqH18JJebPd3eBS5apVFwPlHcQIshRjimt7x78gECW3QXPwFfgKklLineFqER8mtaVeSlczydsmT+Lmg23cpot1g/cc9Q02dPYIaKcvEDoIp3Y+JzCIT0d1zK79tft+V5APKnaQaMBxnn86V1J1Go0Zxc8uuqZ0wOQGBwPCPezqSLcka0T/S79FcmqWCwiqJXgzB73gtZp5+19WnCudPLEL/++Tzn7ALRL5WM3DxIS1WKW+CFKEkMJnKAT7bcC/SsUCsDKVcLmheUj3+geOe+2hS9RmEcoJ8Ej6AaargNe3p1hZg5fO+DWRMsc5CbMlkSW39vfX8dUslOUUKWGCMoHtXWYEyrnivRscV4Er48dNVzup52BQkqqG2gH1i5MtA3KlE6fxqAQQsbrxWxUcSVIKGWm7H4Z3lqO3d7+XyLkNu+uDSW2d056z/yd6V37ZOrFRHNzfqG6fXhxyVcPu0XPyy2wnjcpzCfRDBgsWFVczoO8eKgkQXAkIgIL3oQ6PABXfIpsWWrEcXDByPVgbuR19BxRmAjeMKYujCvUm2w6efrjPipsRAZXeRR6wj0X39uLonYURp28/elFQbwX1OCPc9sbs+bHWwh7bf0ZC8HH1+sVht6IYuon5S5Xc5Jd3wb08eo66iZQfwRWE8MVdGcgDaaKSg71JdJms14nDqBQjcOQMHT3pktcUfbYiGF79fo/Kgi/0FQFnKz+tkO9r2aspAOnT4G0BOVdULV847ySd4JbdnliUBTC114vv1ryu8v5RheQNlq6A2Wmt+qfmX25suBw0t5tjFppaTTDbNisHTT2TkHYszQkhQCfBMkK8Z3ibozAw5383u55/sb9tQoFn2ysY05Wo1ZeQolv4WxRpVyCmcLXHdag+qjUbtfDqBZImIjj3XrfLc07XS3Oc2tbK8dLvk84L7cv6L/MjJ85mp+v5nLctjntELjtzUik8uJWN8wUMfOl8A3NyZ7u4kTt7+uoQzt5yRziDMVOcFNDB1YqKvUwTQVRiJpOqDxN0Bv2fYpmLO/Z2ubJ/yLEFoRn8Ax567yjykLQcLrbJHNra4XlHS2HOxeyklubS5Dzg014et/lbRC51iOMIl+p7a6vtymBRKg6eXxK4zltuCxG9AnPg5ghU1J1elN0BcIGlAbOTCXRaYOJoA1AHQXjTGejPfj8wX4RCam+iwDT3fM7aBVBr2YKnalu+kldmOnL2WkaBkZ8TAOodhC4uyCvSM2CWh5UTMOcQBHC4vfN/U6bapawcdObwctbRdJ5KYRlJ5H0JOhvspl3wZswUXnM4ttWp1aJXUHVhBy8KUJcix3XCldq1Ytut77b2erG0Jvfp3fbqQvDIXaFwjosouYnL6T6EvMtuROUy+D+NHSqtW4+u6eoYAVF+huxXpiiewCCvx/bcZOK8j3Ym44rj/rYTI9YgAKzb3jg/aCsqWYsXZd6fihbWqhMdZ3teTd2VoXbiqhL1P6hHuEno86PYH9QuNhD7Fo9C5RGqB7/2adKBQGyQlyn5tdeb1j0/BT4FQYe/i1Qt6wWg5llSygwz982MTuoWQhhSzgUYlY7yAxOP1t6SEEcBFNGqs6u5x1t//qrEuIVDLwd3xggqIotU08dxULcgTapRqIFEikadZBlhIPHedDi5wJHcV076ITUxnK7aODYMSodRHq42Flwc2xzXHWeRUYott2ghXI3S50S5AkYRDkPrvqlPEOaTu0j1ql8pdUIKFoJzYrdXZCwZPSmFhXPAu7emPQ5rTEn0yky7gqcEUadpZ4C9e/xK+r+51S8j3Tu6svdNgu/8/0IOv3obpn2G/10HfFjPVui7itr7JXdm5VBdkqBM52tl6XXOKXIililR3jHIXz2ztTs9BwwQ3HtZeKHCHzy7vZPJcrHK9I81LNNio+nb5VNz9y67dcQcitgZtlsJ3Bk3EZmLLbGEVlQVblMOq7rude6Y5zSOBixukfP7Oq4FCrFFqqgbFiRNu/nTorZupGXDQ9QueRbzXYlGIvzwaZ++vmbD94nrB9VwLtnP//y4sZa4A4Cw4Dx6Ua0Q43r238QFQUiUhIFNNwP5g0LGsuWXLzFnxafPFl8517b80NrSc+eP1n8deQPEKoMSq3XHFEC3lrzgz5RlAI9RR7skDErvaI1+kE4hPJnTwDlA3Gvj8Jd98U/nzx58s0IMUyLkCJGDZTtUKPeEwPWipUCP01nT4Mx0jMQ8K4OmauXx1ALEVLbYy9+I4SjfwB5F/haxdX73PuPXKhgPcxGNTHemyecf//+y3vXY7rxZ9MSOa1Esq4OR373bnWRTu53YscVA3ZtKFfFnbODPCrmkT/4o3DSmcsdl3KgoHmmZoMclw6pCRCc11fTxd3Bw4YBUUxHCB/jzgcUXB9++fWdSyUXGATzXpAgSYxJhxQtPFbejaKOkjfSmWuj8fTCFRvnUVvBPsAP//nCpW6/q97/+vPi4uK/fvmgxqND4ipkc278I2r/QVuLyIL0jvWxbkESvz/vxlJhuy9+XQRcyPPFX96NyQ8v/yA3G/nt7jMCyntPFv9NKcn+HfieAx5wLv5rPH74+HKJEDb6b63A3/7z4cOv/9Sq/O9AyDTCPyGAvfgXKfDnd/Tyu2+e//ch1CHnyW/vXe5xzrQb/rch/Im88BltraKndP7n+deOkPeuKucXCO3fKYj+hFzEKeppjX6tCPUCPqOD+Pwqwl7I4d1a+P3XjFAQ+/Rol6Z7BaH6vYsQlI2Y71eN0NY9aq/b/Ocf/RD/eP4fl26YsT33p68ZIWok6lm4+sGhHxFqrf2L+BsKbOfnrzuWuvafnv3+TpeCFwgFQz6EEn+hLQZM/e/zrzmWwgj/t1v2UgXcQ8g9qoVBUZ99ePHi/e+a3jz/ZgIXyj6ESE1fnj/5iW7WuQihwnPtZxrXIvHS5791eelEH2I8MXHtF+Rliz/pxbRfCeF7V3Hwti5E+t437+lHnn2lOkQs+fDb4uI3L4SEJ7775+LiM9RwtuKu+hOVh4uLP//0AhRnkYqqxx7svQSjlu/++OMFSm7BXe/dHx9eUBsDIRSl/fs//vjj/QuqRt//8V5O9pH3ExQpoEdXKc5dfBEy1BYuv7ZBpYv467TSqUxlKlOZylSmMpWpTGUqU5nKVKYylalM5f+V/B90uylF8jp9DwAAAABJRU5ErkJggg==',
      rating: 4.2,
      employeeCount: '500+ Disabilitas',
      industry: 'Retail'
    },
    'Hotel Harmoni': {
      logo: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUSExMWFhUWFxUYGBcYFhgXFxcWFhUWHhUVGBgYHSgiGBsnHRcXITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGxAQGy8mICYuLTUtKy0tLS0uNi0tLS0tLSstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAMIBAwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAFAAIDBAYBB//EAD0QAAIBAgQDBwIFBAAFBAMAAAECEQADBBIhMQVBUQYTImFxgZEyoRQjQrHRUsHh8AdicoLxJEOS4hUWM//EABoBAAIDAQEAAAAAAAAAAAAAAAECAAMEBQb/xAAvEQACAgEEAQMCBAYDAAAAAAAAAQIDEQQSITEiBUFRE2EUFXGRIzKBobHwM0LB/9oADAMBAAIRAxEAPwDAgU4CnAU4LXsEjzjY0CugU6KdFNgVsbFdinRXctHAuRoFICnxXctHBMjIpRUmWllqYBkjilFSZaWWjgmSPLSipIpRUwTcRxSipIpZamCbhkUop8UoqYBuGRSinxXctTBNwyKUU+K5FDBMjCKUV1qpYviCJzk9BSWWRrWZPBZCEpvEUXIrkUK4bj2uOwO0SB6Gi4pabI2x3RGtrlW8MYRXCKkimkVbgryRkVyKkimkUGhkyM00ipCKaRS4GTI4pU+KVDA2SYCnAU6K6FpsFDY0LTgKcFp4WmwK2Miu5aeFrsUUhXIYBXYqTLSijgG4jy13LUmWllo4BuI8tLLUsUook3EWWllqTLSy0cA3EWWlFS5aWWhgm4iiu5aly1wipgO4iilTzUGIvqgliAKSUlFZY8U5PCHmquKxaoPEfbnQrG8aOoTTz/iquH4fcunMxgHmdz6CuVqfU4R4r5OnR6fKXMx+N4sz6LoPuaqXcM6qGYEAnTr71sMD2ZZbffKkKN3Yazpy5UNxuHzB0B1C5hJkkg1w56t2y8mdiGmVceECeDGLvqDWlQVl+GH81fX+a1aLXoPS3mtr4ZxfUViaOEU0ipYppWukc7JFFcIqWKaRQaHTIiKaRUpFNIoYGTI4rlSRSpcByWAtOy04CpAtMkZnIjAruWpMldC06QHIZlpwFPy10LRE3DMtLLUkUoogyMiugVUxuOy+FRmc7AVFgMfJyXNG86o/EV79meTQtNY4b8cBHLSy09RTstaMGbJFlpZalilFQGSKK4VqUimMYqDLLIzUdy4AJO1UOIcYRNF8R+w96EBb+IPOPhR/Nc3U+pV1cLlnT03p87OZcIu47jQGia+fKhy4W7e8RML/AFHbnoBR3AdnAq52EwVEsIGvMD161tMDgMMMOx1a7MjSYEGfIV5zV+oWT5kzv6XQwh0jzr8IlnYZmiczf2FWMNf0zNuDG0mOWlWMWnfN+XGhZftMV3A4VFOW6ZDbgbx5RVS8olzxEOYbjLXcMbKvouotqZdtQN4hd/M1QwnC3S27X8qZoK8201iTvNG+zzWMy27ai1b0zNAzRVLtf3VtmhiRyZtJ6b1RF1VTcVy2WNWWRz0jB3LeS8I2JBHvWwNmKB8X4c35cAZh57g6g1pW2HpXd9NvcXj2ON6hVuXHeCoVppFWGWmEV6M8/uICKaRU+WmsKGB0yEimkVK1RkUGOmR0qfFcoYDktqtSqK4op4FRGZs6EpwSpLVWUtzUzgCi30U8tLLV1sPVW4csk8t6ZSQri08DMtDMXjSSbdrVubchUeKxjXSVTRNi3XyFOsKqCBt9z/NcnWa/C2V/udjRent4nZ+w/BWEtiTqx3Y7/wCBSxeHW7rqp2D8p6HqKsYLhzXTJEL+9aVuFKbYSPOuOq5y88na3xS24MhgsYyN3V3Q8j1HWjKrNVeI8Oy+C4JX9L81qthMU1g5LoLLHhYaz6V19H6gv+O3h/Jxtd6c876uQr3dNK0NXiryHZItHQfzRW9Y7y2Qp0I3H710q9TCxNweTl2aadbW/jILx3EUTSZboP70EvXr2IMKIX4A9TVjD8IIulbikgAt6gR4v96V6b2f4Zh+5MwzEDLAEesfFeY9R9TtTcZLH2PT6D02pQU1z9zyrD8MRCM5ztI02Ua/JrZ9nb1m04F1JZd1+dh086D8VwDd9cIA/wD6HT9XhEkweUUdwvArFwozvmdzOVSdZgQ58ornTzZHvCOlHEH1kuG4rXLtuAFe0Wn6gozDKcw0keVZfhFrFM5VWOhMACcy6jVef+a3Vzh2S4MMQqIysoCxzUxrQfhvH7OBc220cSCLYzO2nU6AGqpbVBbORlnc3LgyuIwD4ZWiVO4k6yDB9NKFWT4xJkk7+u9GuM8WN/EaJltncasxBGkn1qJhZQlphtIG/rWmpScPIqm454KqXMQt0JbWeYIE6HYnlRzHdn2vnvcU4TQAgb+x5e3Wm4DjrqioABp9USTrWlw2LtthGJVSdzduNlA8gTqfYUlk6qsSxlhhCyxPLwjIcXxNoZFtAysDMfj3qXhzsykOZI1BiJBEj41FCxiLd693aamCQ0ELIg6cz7iimDxqqBbacwaBAMAEwJPLU1rosbll8Ge6tJYRORTCtWmTWonFes0tn1K0eU1Vf07GvYrMKYamIphWrylMhIpuWp8tcy0GPuIMtdqXLXaA24kWpFpgFSKtBFDZKlXrBqiq1bsN1pZIat8loisrxYM1wq0qg2H9fv8A2rXWRNPfAqwOYAjc1mujvg4p4N9L2zUsZMM7xAXyER1o7wvg0+J9T9h1p/4OzaAuOcoBJUcz0Ec96CcX4890FE8FvpzPqf7VyIafnLOrPUccBvF8aVXWzYAe4xCz+lSTHvV7CdpLffvZfwhWyq/IxoZ6GZrM9kLI77vDtaR7h9hp9/3oUxzEsdyST7609nDwLVl8nrl7ArcEESDWbxfACpKEZrbbdQfI0K7Odp3w/geXtdP1L5id/StVxrtBaUWGVgVcnXcbRDc133rnattQco9nR0yTklIyuLW5ZVbLjNaE5TAH1bgmuWVfCQ2psPqPIHmPKjnbC8HtZ7YiCoynYsdSD1ERqOtA8NZu21W6wZsMZVl+ooJ1KjmKw6fWWVYtjw/j5NF+khbmPa/waSxdSEuIAxaVXSfrBEferQ7PsbhcMwRUX8td5BBJ00XWszg8CIZ7F6LLSy9VcH/dKI4ftJcwrmyELtkDEtopkD9I1bfnVmr1EdRZ9WCy/gr01Mqa9jfBm+NXG766MxHi5nxaxMnnVq7eu2T3lpSVJQDrnI1gCuYu8rd5cuQGOVoiNSNQK0XBuNqqC2ttQ0Alm5g7ECg0sLf0WZefEWCwuLvXLN66BbCGSNRMiIInXfnQ3GcM/F4pnCGQQnRfDpqa1XHb9tUt3M0fSfEYkyNQu5+KE9s8acLdS5ZXOLsk5iQgYBTAA1bekjNSh/CRHHEvNlPjXZsWAJcHYwn2k1i8Vagkkfq086Mdo+MYjFIEd5A/RbGVNuYG/vVA4jLbVCg1HPkRpt7T71bVCcY5m+RHZGTxFcDrOEZ7LENlYKzroOUStD8Lh7jiWLHoWYx8VawmKZmgnkY6AjWI9jRfhqqWGcltdgN/LTU0ZyjFZwBQcn2BUwQtsGk5hqAP4FTcNBN0o0gXAR566T5GYNbbtabSAPkSwI/UwzHTkg1rHYNUuq11M5ZSRtAiJB32kVVVe5844HnUocJmhuW4ETJEa9aidNJqhwnij3bjJcIkiVgRsdR5nUGjeEUGV9xXptDek/1PO6+jdHPugaUpuWiV7DVWe3XZUkziNOPZUK1wrU5WmEVCJkUUqfSoBycAqVaYtSqKIjZNaWatpbqvYNXbRquRZVhkltah45xHuLO0s3hH9z9quIayXa3FZroTkg+5/wAVms6N1XYDvYp7pzOZOsdAJ5U0JTgKfFURjwaHIN8OTu8DiLvO4yWl9B4m/t8UCVa0PH17rDYSx1Vrz/8AU58P2BoComufY8yZ0aliKHItars92aXE2CQ0PmOUgzpA0IrLiifZ3FXbeIUJcyo2hnbRTv6mubrd/wBPw7Ohpdu/zLvaK1dsYdEvb96dRrIA0NbTs6yPYRCBJWY2BmT867UC7W4kOLQuQCbTseYBbKF3161LieG4nDOjp+bYbu1KjRk0USPLc+9crVL6kVHp8G+nMOf1AOLizcvokomeSg+mVOjDpWn4HwpL4d7jS5URG+nVtANKB27ytfxWYA+Lu4O0m42vwRVjGcAxV7EMLYPdwIklbcgLqBP9qthCTW1cMqslFPLAnGMB+ZdyjMqwNwf6dZGh6VauYY3LBdGK3LdoKgX6m1n33ipsXYGGzWy0uAA4G0KFIP7/ABRTgFhG7trpYK48MDcrMgnlvV1klBZfOAQi5dcZM7Z4TdKg3JJ3kyzE8vfyrT9pMO91rVooWAVXHLUrDSdPvW3svh7dqfAmXWWIk9dBrWc7UYhXwoxduS6qSJBAKhhOaNvSkruc09qwI60nyD17KL3QJeG5qgkxHlWN4zhMrBVB8J1B+qD1HLarlvtRiWtMpu5FIIi2Musdd/vQbgdxRcPnDHzg6nzME1dXVbzKbK53V52xRBhEllC75gR6azPrTuL2btp1K3CqMuZQumxIYT1/mtC2AFu53kakTGwE0W4FZw95Pz1DNbZso1I8RBMD1FaFGOcz6K7MteHZibVhrsZUe4eurn5o/wAA4HiEz5wFVxsTJ+Btz516Jwzh6NpAtrGkwPsKp8QwwUGHJ8kH96qnrNLBbVz+hK9LfKWW8GF4RglS7cRgC6aho1giNPmiR8JBHI/+ftQni/Dr9sXL3iWCBI3ytz18wPmp+z2I7y0VJlkMHWTB1WfYx7Vt0mojNZj7GfU0uMsP3NBeQESNjrQrEkUSwrShXmv7H/xWT49jyr5Jy7nMdBI2E13vxMa61ORwLNNKc9kQi5qNjQa5iTcTOSy5TEqAQZ30rr8YUKeZAEGdT5mh+YVZeeCv8vs4xyFs1KgScdMaW2PnP/1pUPzKj5/sN+At+P7h1KmWoEqZa6KOfIs2avWhQ9DVuxdFJIaplsuFUsdgCT7V51ir5e6Wncsx9zpWv7SYzJZy83MD0G/++dZACsVvLOnThLI4VZ4fY7y6lsCS7KvyYqtWi7C2AcULh+myj3D6hSB+/wBqWbxFssistIh7bYgPi7gGyBbY/wCwfzNCLTxXMRezuzndmJ+STXBXJydZIeN69BHZjDYmwrWnVbgRfEuxYATmHrXn68qOf8P0Nt3BuZWOTLB31MmDvuK52vjY9soPo26WUeVI72zwNy1dsWz4stm2kzMnMwJ+Yrc8E4wrNlRhcXMVg/UhBj4rO8fxefiKoygqGs2/uDPy1HP/ANNtd+uKw9wpDZnWZVhzjmDXP1MlZYo2cPPBrrWyPjzwAeCOUvXsQtvvMt24WAE/qIE16AvGbSkpdZUaNVJlh6IuvvWI7DYjL38mM14idNpPX2pnaVGOLa5ZAaUILk7nSD9qj3ybhl4JLalnBV49hhfv3rltgVgQYgEHNOlF+A4YXMMLbGDbF7LtJYjlPrWct3u6gMwkooaJ1EmdPetL2f7T2bCtCylxzkY7DU6HnrI+K0TqWxZfAu7jhcg3gnAsUbLotjKWMZ38Ph6CdeQ5UaxmDfDYBbFwhixdCVGgzyw+NK0eExrX1MA+qjKB/wBxpnBkF0XbWZS6NOjB8pgbnrvQjdDlQjyVOuWU5P8AoYLhHYnvAYQncy+0xGxin4/sqbSly6LAMINSdNB0FHh22trcNvubjuhZTnIVZWZIA5SOdZztR2vu3CQuW2oKyiKJIIEgufWKWEtRY0+gydUO0ZTGYu5cUEs2kDXT1HnRnsylxiwQ5YBbpIUSQJ50QfgqXcKLq6MpMxzkn+Rr51Pwi2tpLTxoLi5gdZDeE+sfxVs5KS2saMWvIfwntrbWAlgs/I3Xn1MDQe9Ve0fazEXVI7woCDpbOQacsy6nToazPGLDWcQ6Ip/LuNGkeEkx9iPiob63HMkAepn1qyOlpjhmSV9ssmm4Rinv4N7RackgjckGSsnn/wDWncCVO6BVQDENAjUdev8Ams7w/EPYDQZzLB6abHQ77/NV14ldVTlcrLGQAIJ5egqyhqu146ZLk51rd2jZ3yVBIIWREnaDzNYPtDnkZrgZSTBmRG2bTlWyvYm3cw4uMJVgNNjPQedZXiNu3cfwqQJgzJG8Tp9IrZdJSjsyYUlGW4pYBzdA0DE+DXUTpB+/703jPDUt5RmMkxJ289Kbi5sNKRmB8QUypAG/rrVPEY27fIB1jWOgquU4Kva+wqMt6afAeweHw+RfE3/yA+06V2qNmwmUZwM3P6aVMr4Y6Qjqee2aVDV/DYMtqTAqmkCrIxkabV6eUn/1PPRjHPkFbOFtpqzTyHrUTIC2lZTifERcuLZOcQw8QMa89DRnE8XtWIDkzEjqem9ZFqVmTzwja9P4xSXYG7WY8G5lB+gQP+o6mhwB/wA0zGvmm4QCSSZ6TVI4lkaNwAP81hnqdlnl0zZCndDEewkBWm4MO64fir2zXMllfQnxn4J+KzCtImtNxpu74fhLXN5vN6H6fsRVmosTr49yaeHnz7GcFPQVGhp6tXPydJIK8BuW1vo12BbXVidoj9ta1nFsDgM1q6jQSwICGV5axyGh2rz6+Wy+HWpbGJeBmJEGFEDn0j1rl6verVKLNMbFGDi0aTFNHEnus0ot4sANScuw8q0/A+MW7jjLmRobMjCP0knyPtXmKYy73mYg+E8wYYzsa1/CcXaVgzW2LKHHelti4IjLO2orHZic4ufyWVXPGPsUODlzZd0XN+cZjp/prZ4C9g7BZL7IrRBDtnYHoEUedZrsnf7i21sH6rzCd9BHtQbtWt25jrrW1Z2OhKrPJY2GlWwi7W0sl9ktiTCPHLSX8S9yyZQWwRplBEty5bUQ7L2Eu2VtMs/mZ/6YCx/vKhHDMJeRTmGUrZh1YawztHp9Qq3w253WWGggn9gYrXKp7MCRku/kzFziV0XbivdchWcQWJAhogDatv8A8JsWG/EpP9LexzZj+1D8P2dS7cd1sF2ZnczMSzFjE6Aa1p+x2BaxfaQihrZGVY3BB5VZvr27PdmZ02bt3sZTj3CsQcY7WbLkZ2MxA121NVMb2WxOVr14oiAajNLfA0G/WvS+LcaCI1wIzZT4hzA2JrEdp+MWsXhAVbKZIKljB0B3U6AedVLVVRhtWc9CzonuywfwnibraKBsq+2sCKmxeKtNYADy4Y6TMj9qzly99KqAfAInww3MEjcfxSWyGOknXcbbaUYWvGMFiw/cOcO4V3mrXUQepJ+K0/DuyNlxP5t0/wDKMo+9Zu7ba1hTftuneJcVGBhtCDqAfOKm4X2uxLeF8UyqpghFVZB5iBpArHOF08uMsL7FztrhhY5DPFuD27Ck/h1T/muNJ+9Y/GcKfW4dbZynMsRlzbjrUfHLy3LjElrmxDOZPMfvFHez/EO9wb2Mo8AZdd8jEkR6aj2po1SpSnnJFbG17MYKPFMB3VlBbzMgLMdeRjn/AGrN28a9tTleBJnz5R8UVxPGR3Qw5BzaKWMQBJAP2oFjcCFbLJESD0Metar5LcpRZhUO4stX8baIHgyyNdyDG59wefShwviTkWB8TVe7YHJgBO5qRtViQPIDlyqucnPDYFWorB0326D4pVAGI0j70qXBNpscTiltrmY6VRtY9L/gLFdRtoT5TNX71gOpVgCP91oZc4CFGZMxYGa9bq/rZzHmJwNKqepcSLnD7EO2Y5ikKCeQiZ1560O7Q3+8cAGdI9DNOS4blm85OVg2o2iIAHvVe5wt7ai4w8JHhkgEkidBua52pu/hqEVw+To00t2ucnyuCsrsUy6kkn1gU51yjVZPWj/DOCNOYp4TyYnNtuRyFCOI4Nrd1lYg6eIKJC7RmHLTWsjtUY89mv6bb+EPwY71lUfqKqPKTFaDtziQcT3a/TaRLY8oH/iiPZLs5bOW+M65HlQYhwB9Xl/iouLdi8Q9x7ouIxdmbWVPiJIHtt7Vodu+CK4VbJMyguUleiOL7O4u2NbLEdU8f2WSPihd1GU+JSPUEVTPgviGOHYVLltizRDACCAdQdp06VRttlUvoAAYE6kyIBjbQk1Qv2ywTTwyx8zOUaRv9JFFrlkEObnhfLoY0IgA6c9J18hXJtl55bL5KGFwNweLc6ZQU58x56mi/DGtZ7sSfy7jR0IXSZ8xQ7huDIYKhzKRJB06bzRXBYVLOHxB0JNtgDm5MBIy+UfeqMwckiQhyO7F8XtWEW5eQ3MzECAGOYtAOtej8N40t8lVQrpuxAE+ZJrzLsiloWrWcSe9kezA0V7UIvcu9uyMzYhxIBzQttT12npW+rdNOMHjBplBLl8kHaw3zi7gtmQQufKQQVBEaj/mKiqnCuDX71i4wD5kfMDrvAkTRzsFiLX4ZWukibyARH1G5IBJGmwrQ4JfEtxLqi3aa+LiZobMbj65P1SCOXKtkavDEmBNdgzDYfEYdGuOlp1UCDcv/U2UGO7AmdTz5US/FFMVazPaUkqDbt2mA8QmTcO+nIUB4phrj2r6W7TEm/auICMgy92FbVoGnSjnEZuLbY3LgKLb/K8ITMqwTI1POnjpq+Ht5K52/cB/8SbmS6CrsqlWBUMyoSGgkgb7nrXnr2M/hDCPLcnpHSvTO3Fy1ftG4AVZJOrTOYmQF5/VM+Vee8JwAYPmzfSMhAMZjtNc2VTi8PgSb3PcVkXW4gmVEDoRME/FVLbP+rwpAJjciDHMTrWg4jgu47tjblpYP4pDKRr6QYNBsNetyS5IjUDLmDeXptUsjhoTIewWLT8PiCtvRkXKx1YFWAPi6nMT7CqeF4PiS2ZbJAI3MDSNNT7Ubv4lrnDi5tqiEoqRHi8Q10O9bHD4Obcl1kBdJ30q2E6a4+UuCShbZ0jz652axLmSUXT+qT9hFEuC8GbDszNcDZhBAHOd5Pvy51ob7IN3+AascOwdq6dXYe1Ges0ij3kaGkvTyuDG8V4BbKu6li+pE7dYjnQm0ICPJVmDDKVPKdzXrPFezttLLvbDMVUkGeYrzvF3WykKQG6mmplVqItwXRVbGVb8vcyWPw6KYysSdjER10NVLtpR+kjQc+cb1oMcgK+MknmQJNDO/AU5kBGwJnbePI08qlgrUmDijeVdq8qTr3R16MIpVl2Mvyg9w3ELoDlAHVpPrWmw+UjR092Arya0pbRQZ+1PRzIA3/vXTs1NkoJJ9GOuiEJOTWcmz4TwlG4k1t2XKAXOU+EkDw76Eiafwq3+J4kXaTbtMRH1KAshRp1NZJXYEnMQ3WYM/wC/tWj4Zxi5h07qyQNiSFzO7/rYnUAAzEjlXJudiT2y7/Y6dLr4yujd9pO0FrCWmAQC6R4BoDJ5meVZjsRxUPe7q6Ae8VgNBqx1Zm5mRIihGP4rbee9Q377t9WfQAHQBVECfvWt/wDxGGwly2SCCLXe3YJmW2SemhEVgacK3HnLNEp7p7l0jTDCMqoqBVUaABQAByq8+FZEzGGMbba1g+G8Twt43Lt03VZrjZcjOgCDRRCGOU+9OTjlnMwGMxCifCGcsInTRlNJuure1NrA7sqms4RtMMjMMxBA+ahFnvJBUMNfqG3zVTBcVRMMLj4uRz/LU84GiwenKpuFcbt3A4tXASBJLIUEa7THSl/ML0u8r9A/hqXylgB8d4ArFe7RVYGCwgeEz08zWVOGIbKYJzERvA0yxWqw3blWVw2HDgtkhXEmeZBGg1ptzE2LyIFRrZDKVnuyIB18U5tqMrbG/NFcqa5fysDYXg1xi2RoAAJjfUbAdddqKcO4B+S6vmm4uVjAkAHl0rTcExKLaUf+43iYKoaTvAiZAGntVxeNpn7sXFzzGQggzvEEetUvWxjLiL4HWl+5n+EdkrSBQFuHLJGpG/oKOrgTlNvIchJJB2ObeiOD4g6uJDMJ2XfXnHQVRu8fSfGAMwDDUtAPUAVpr9Y8d0Iiz0r3YkxljAW0GVVtqBsIFSvay7kD58/5qrh+IWXaLd20WOy+IH4NJe0KXCUe7ZXKQIzawQCdPtRl61e+sfsD8LTlc5LVlUbSWJPQfzTDgEzQ+f7UC4j2hSwzAYgaHQBASQdoJI9Nqhw/afvYkX3OugKWxIPsaSXqGpksqTx+mAumiLxgL9r+xNu7aV7RYXNgS3hiG0IHXT5rH8NxV7h1zLiLMWiAuYLIUhmOnUeI/NbQFnw63izgC4B3Rc6CWABYHqyn2qrgyl5Wa5ZtyDsPHpHVhod6pt10ofz8rH9R66V7GQ/4g461dsqwuBtGym3GjNly5oGgIDUBu8asfh7At2g18KFcmcoyyAY/USCah41gszOtpMkAM4BJGYGJk7607gZsIM7KjGCkuMwB11idyK3qMVWnyymUnu6wObB43EgAo2UfSAMiDpAPOvYey2FYWUVwM4QBo11jXX1oLwa4Hwtpx/SvyN/vV/iRIsZw7plZS2RipyZhn1HlrWbUN2Yj0jRXFQTknkfxvAxrFAFcodKMXuEIWXOt1w0g58RdbXcfq6Aj3FDOIcNWxiHtqIV0V1EyQR4XGpJj6Tr1oUQi/Er/ABW58BXB4/G3U7uwqsJ8WbTw84PWvMuP41sPeey6EMhiJ9wduhFencDx/dTWb7c8KtYi6L5mSsGD02+1bqtQ9O3xwVW0fVPPLnGWOy1VtY8BmDKTm38pFEOJ8NFu5C/SRInX1qpjMGMhYfUIPtzro13Ocd6MFlSi9rOJjkAjKdPT+a7QrvD0rlJl/wCoGP8AcmmXHsP/AGY9jr9qaMepJHdBZH1EbfI8qjw3FsqpLLoGA0JK66GOZ86rPxAkyCYDZoOx25+1NLXXPx/3/Ai0lMeSi4YvqCCYPnr08q23CMfbXC3baiL90FZiSFIg67iRJ/7qzNzHd67XngkDw6QATooA6Aa+1VE4gwmGOoj+R5Vhti5x2mqE1DlBrsxw1Wxllf8AmBI5eHXnRvtZxHM2JfMNSVX/AKbfhEepBP8A3VkuE4s96rZvp11nLpzOhpnEMeblxmLSCYBjfnMeo+9TEnNSfsTcvpbfkPi4LFlVlZKzqSDsPLrNDbMZGbOmYhQF3I8QiCdjt8VRtY5oIkbcwNp5aU1cbcZQo1jMYjoNf2n2pp7pNsWOIpI9NxeFP4KzaOmYToskaFmEjeSFArM8SQ20VSpDQOo1jU6+lU8RxnEeG2HICKsQdPChPz4hVC7x28fqJPhKidYGgMdJ/msFemmuzdPURawkXuFi5bZWc6sRI01C6gfA+1bRcHaW2r92C7d2J5znUafIrzvC453diQSYIUbwToK01q462jFwQEdQn6sylPF8g6imurbkmVUy9z0fC4BITIAjrmBy5TsYn96z1x//AFNss+acQxkkfpQjl6VmeCcVuLbHeXGk5YknZHYvPqAPms5hcU5NuSY7xTv1JmPmsVegkpyyzTO5eJ7/AIZstyR/Sf2ry/tqhZsO4AA7sA+pVj/avR8JdB2n6DyPSvLuJNneyfzcqooYBWiQpnwtpOopNFS44+zY+pfHA/sox72wZB8QnxVxEP4m9qBDKYnXc6fapODcQt2byuFv6Ez4DBGXQaDrRbhnGC73GKd1mW0CMkBoa7mnOI2YfFX2QkpOWPb/ANM0I5SX3M128X/1MTui+fWqnCXCOM7H68seIHWI29a0/GWIxPfW/EO7YAqVkNMjSR1O1AcQLjuzONWZGkg7iNdBHKraW3WoNcYLL68eSfJqeGdobP4ZrOYy1zMu5IylSw1/6aK4DiduyHZm0KZhpv8AVp66V45acq7DXRnA9eVGUxpa2UNxWBTIurSpDTOq+f3o6jRKzAteo9mgzdvKbF8q0CYmP0OTB9djWZ4VetrnUSYg+Ry+VGcLxO3bw5sscwOZJG2kwf3rJBougoNCY6gjZo68611V9oS+ecM9B4B2nW3ZtoTr30P5K+b7Zv2ovxDtdaW4+Hcfln8pz1Dr9Q9DNeUrbPeRp+k6mPpPnz1NEe0+IlxcUQLqAkAhgCoAOo8x96aVEciq+Sib/FdrbyCwpFsgOLT+L6nABR5jwgxNVuK493xV24FtrcsIRcALMzLllY0A0kfFef4vGu6CSPGoPSChAzeun3o1wrG5/Gxh3Uo7AiW0iPOhClQ5Eioth/jPG2GGF+yZUiCY2PX9xQnFdqmfCC5EMGCt7/q96rNdGRrJbwgmEMQNdZFBr+JVVuWxGV8pEdQdvKrlFS4aJJyXTK13jFwyCZ1n0npV7hGOD+FhJG46jnQHELEEbRTsDeyuDr7VdWlHhGeTcuzRm7aUkZFEEwN4E6CeekUqHvxIT9P2pVZhfIOfgpX7ymIBHn/iuC7yEkefXnTVZdJpImugJ16E1QkDLJWvnLlgQYnTXTmPmoQTuNqtrhrp2Qx6VLb4Tdj6R7mokycs5w3GrbzMVmUYDcQTzqD8QMsZQY1Joja4DcgyU9if4p44C+0DXzqbcDZBiX/CYUaxr6V2xjCg0C8+U70ZTgLHcKB5n/FXLPZ4c2Uegn+KGPsTLM7cxTPJI1PQR5bUhcubLOvICtZb4Hb5uT7AVZt8JtDkT6k0dj+A4kzG4YXUJI0MfNWrNy7lYMSZGm5I1Ex8cq2drCWhsi/E/vVpWC7BR6ChsLI7l7mXTs213a4wQxGb6/PTl0o3geDWLGuUsw5mWPsKvi+ad35OxqfTLE0NuY/EHRFZR9/vVTNeHJ/vRRLpqYXTUVcV7BlJvtgcX7w2Fz7138ZeHO4P/l/FGe+8qq8Q7QW7GhViTtpA+TRcF8C5x7lFuI3v63+9R3uKXACTcb5/zVHF9rbrSFyqPST8mhVzEljJMk7k1TJr2QjtfyUL2GZmZ3cgsxJA/vVc4VAdHarzKDVa5Z6VFJlDkyvdwqkAd4Y9K4mGAg5yI21+asjCetRtg/X/AH3p9wNzI71pSZzGfXmOdMNlSApdiBMD13FTJho50rmGBqZDkg7hOpPvTDaykMrHQyNdjVj8MB1p2UVMkTKjkli5ZsxmT69ag7hZ3NXXw46fvTRh16Uckyyo1lYiTUZsDk1Xjhl/0004Yf6aOSZKZt0qufhx0pUdxArZtgbAfFTpuaVKrUMWrY1qcClSpgont1MlKlUQUJjTl3pUqnuMOp5rtKgwkb0iaVKgEdNS29qVKoEkVjUysetcpUCD1NNuqCsESPPWlSovoSRluLWwLkAADoBAqhc5UqVZH2UitmlNcpUgpMTUFw6UqVQI1BpTLm9cpU6AQg6mn4M6mlSpyIsMahY1ylUCxsb1C1KlUIjtKlSohP/Z',
      rating: 4.5,
      employeeCount: '300+ Disabilitas',
      industry: 'Perhotelan'
    },
    'CustomerCare Indonesia': {
      logo: 'https://mediakonsumen.com/files/2024/11/smbc-indonesia.webp',
      rating: 4.3,
      employeeCount: '1000+ Disabilitas',
      industry: 'Customer Service'
    },
    'SugarTaylor': {
      logo: 'https://placehold.co/200x200?text=ST',
      rating: 4.4,
      employeeCount: '100+ Disabilitas',
      industry: 'Fashion'
    },
    'SafeGuard Security': {
      logo: 'https://placehold.co/200x200?text=SGS',
      rating: 4.1,
      employeeCount: '750+ Disabilitas',
      industry: 'Keamanan'
    },
    'GreenClean Facility Services': {
      logo: 'https://placehold.co/200x200?text=GC',
      rating: 4.0,
      employeeCount: '200+ Disabilitas',
      industry: 'Facility Management'
    },
    'Inclusive Support Center': {
      logo: 'https://placehold.co/200x200?text=ISC',
      rating: 4.6,
      employeeCount: '400+ Disabilitas',
      industry: 'Customer Service'
    },
    'Resto Aksesibel': {
      logo: 'https://placehold.co/200x200?text=RA',
      rating: 4.3,
      employeeCount: '150+ Disabilitas',
      industry: 'Food & Beverage'
    },
    'Kopi Inklusif': {
      logo: 'https://placehold.co/200x200?text=KI',
      rating: 4.4,
      employeeCount: '80+ Disabilitas',
      industry: 'Food & Beverage'
    }
  } as const;

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12" data-aos="fade-up">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Perusahaan Ramah Disabilitas Terbaik
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Temukan perusahaan-perusahaan terkemuka yang menyediakan lingkungan kerja inklusif, fasilitas yang mendukung, dan kesempatan berkarir yang setara bagi penyandang disabilitas
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6" data-aos="fade-up">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-[#22243b] rounded-lg shadow-md p-6 animate-pulse">
                <div className="flex gap-6">
                  <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="flex-1 space-y-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6" data-aos="fade-up">
            {Object.entries(companyData).map(([companyName, data]) => (
              <div 
                key={companyName}
                className="bg-white dark:bg-[#22243b] rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
              >
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="w-24 h-24 flex-shrink-0">
                    <img 
                      src={companyExtraInfo[companyName as keyof typeof companyExtraInfo]?.logo} 
                      alt={companyName}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {companyName}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
                          <Building size={16} />
                          {companyExtraInfo[companyName as keyof typeof companyExtraInfo]?.industry}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {companyExtraInfo[companyName as keyof typeof companyExtraInfo]?.rating}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <MapPin size={16} />
                        {data.location}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <Users size={16} />
                        {companyExtraInfo[companyName as keyof typeof companyExtraInfo]?.employeeCount} Karyawan
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <Briefcase size={16} />
                        {data.jobCount} Lowongan Terbuka
                      </div>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Lowongan Terbaru:</h3>
                      <div className="flex flex-wrap gap-2">
                        {data.latestJobs.map(job => (
                          <Link 
                            key={job.id}
                            to={`/detail/${job.id}`}
                            className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          >
                            {job.title}
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {data.disabilitySupport.slice(0, 3).map((support, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full"
                        >
                          {support}
                        </span>
                      ))}
                      {data.disabilitySupport.length > 3 && (
                        <span className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                          +{data.disabilitySupport.length - 3} lainnya
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}